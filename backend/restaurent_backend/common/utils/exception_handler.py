"""
Global exception handler for the API.
Catches exceptions and returns standardized error responses.
"""

from rest_framework.views import exception_handler
from rest_framework import status
from django.db import IntegrityError
from django.core.exceptions import ValidationError as DjangoValidationError
from django.http import JsonResponse
from .response import APIResponse
from .exceptions import (
    BaseAPIException,
    DuplicateRecordException,
    DataIntegrityException
)
from .exceptions import ServiceException
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that formats all exceptions into standardized responses.
    
    Handles:
    1. Custom APIException subclasses
    2. Django ValidationError
    3. Database IntegrityError
    4. DRF exceptions (via exception_handler)
    5. Generic exceptions
    
    Args:
        exc: The exception instance
        context: Additional context (request, view, etc.)
        
    Returns:
        DRF Response object with standardized format
    """
    
    request = context.get('request')
    view = context.get('view')
    
    # Log the exception
    logger.error(
        f"Exception in view: {view.__class__.__name__}",
        exc_info=True,
        extra={
            'request_method': request.method if request else None,
            'request_path': request.path if request else None,
            'request_user': str(request.user) if request else None,
        }
    )

    # Handle service layer exceptions
    if isinstance(exc, ServiceException):
        # Map service exceptions to appropriate HTTP status codes
        status_code = status.HTTP_400_BAD_REQUEST
        
        if 'DUPLICATE' in exc.error_code or 'ALREADY_EXISTS' in exc.error_code:
            status_code = status.HTTP_409_CONFLICT
        elif 'NOT_FOUND' in exc.error_code:
            status_code = status.HTTP_404_NOT_FOUND
        elif 'UNAUTHORIZED' in exc.error_code:
            status_code = status.HTTP_401_UNAUTHORIZED
        elif 'FORBIDDEN' in exc.error_code:
            status_code = status.HTTP_403_FORBIDDEN
        
        logger.warning(f"Service exception: {exc.error_code} - {exc.message}")
        return APIResponse.error(
            message=exc.message,
            status_code=status_code,
            code=exc.error_code,
            details=exc.details
        )

    # Handle custom API exceptions
    if isinstance(exc, BaseAPIException):
        return APIResponse.error(
            message=str(exc.detail),
            status_code=exc.status_code,
            code=exc.error_code
        )

    # Handle database integrity errors (duplicate records, constraint violations)
    if isinstance(exc, IntegrityError):
        error_message = _parse_integrity_error(str(exc))
        logger.warning(f"Integrity error: {str(exc)}")
        return APIResponse.conflict(
            message=error_message,
            code="DUPLICATE_RECORD"
        )

    # Handle Django validation errors
    if isinstance(exc, DjangoValidationError):
        logger.warning(f"Validation error: {str(exc)}")
        errors = exc.message_dict if hasattr(exc, 'message_dict') else {'detail': str(exc)}
        return APIResponse.validation_error(
            message="Validation failed",
            errors=errors
        )

    # Use DRF's default exception handler for standard REST exceptions
    response = exception_handler(exc, context)

    # If DRF handled it, wrap in our standard format
    if response is not None:
        # response.data could be a dict, list, or string depending on the exception
        if isinstance(response.data, dict):
            detail = response.data.get('detail', 'An error occurred')
            errors = response.data if response.status_code >= 400 else None
        else:
            detail = str(response.data) if response.data else 'An error occurred'
            errors = response.data if response.status_code >= 400 else None
        
        standard_response = {
            "success": False,
            "message": detail,
            "data": None,
            "errors": errors,
            "code": _get_error_code_from_status(response.status_code)
        }
        response.data = standard_response
        return response

    # Handle unexpected exceptions
    logger.error(f"Unexpected exception: {type(exc).__name__}: {str(exc)}", exc_info=True)
    return APIResponse.internal_error(
        message="An unexpected error occurred. Please try again later.",
        error_detail=str(exc) if logger.level == logging.DEBUG else None
    )


def _parse_integrity_error(error_message: str) -> str:
    """
    Parse database integrity error and return user-friendly message
    
    Args:
        error_message: Raw database error message
        
    Returns:
        User-friendly error message
    """
    error_lower = error_message.lower()
    
    if 'unique constraint' in error_lower or 'duplicate' in error_lower:
        if 'username' in error_lower:
            return "This username is already taken."
        elif 'email' in error_lower:
            return "This email is already registered."
        elif 'company' in error_lower and 'name' in error_lower:
            return "A company with this name already exists."
        else:
            return "A record with these details already exists."
    
    elif 'foreign key' in error_lower:
        return "Referenced record does not exist."
    
    elif 'not null' in error_lower:
        return "Required field is missing."
    
    else:
        return "Data integrity error. Please check your input."


def _get_error_code_from_status(status_code: int) -> str:
    """
    Get a standardized error code based on HTTP status code
    
    Args:
        status_code: HTTP status code
        
    Returns:
        Error code string
    """
    status_code_map = {
        status.HTTP_400_BAD_REQUEST: "BAD_REQUEST",
        status.HTTP_401_UNAUTHORIZED: "UNAUTHORIZED",
        status.HTTP_403_FORBIDDEN: "FORBIDDEN",
        status.HTTP_404_NOT_FOUND: "NOT_FOUND",
        status.HTTP_405_METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
        status.HTTP_409_CONFLICT: "CONFLICT",
        status.HTTP_429_TOO_MANY_REQUESTS: "RATE_LIMITED",
        status.HTTP_500_INTERNAL_SERVER_ERROR: "INTERNAL_ERROR",
        status.HTTP_503_SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
    }
    
    return status_code_map.get(status_code, "ERROR")

"""
Standardized API response formatter.
Provides consistent response structure across all API endpoints.
"""

from rest_framework.response import Response
from rest_framework import status
from typing import Any, Dict, Optional, List


class APIResponse:
    """
    Standardized API response wrapper for all endpoints.
    
    Features:
    - Consistent response structure (success, message, data, errors)
    - HTTP status codes
    - Error details for debugging
    
    Example Success Response:
    {
        "success": true,
        "message": "Operation completed successfully",
        "data": {...},
        "errors": null,
        "code": "SUCCESS"
    }
    
    Example Error Response:
    {
        "success": false,
        "message": "Validation failed",
        "data": null,
        "errors": {
            "field_name": ["Error message"]
        },
        "code": "VALIDATION_ERROR"
    }
    """

    @staticmethod
    def success(
        message: str,
        data: Optional[Any] = None,
        status_code: int = status.HTTP_200_OK,
        code: str = "SUCCESS"
    ) -> Response:
        """
        Return a successful API response
        
        Args:
            message: User-friendly success message
            data: Response data/payload
            status_code: HTTP status code
            code: Custom error code for frontend handling
            
        Returns:
            DRF Response object
        """
        return Response(
            {
                "success": True,
                "message": message,
                "data": data,
                "errors": None,
                "code": code
            },
            status=status_code
        )

    @staticmethod
    def created(
        message: str,
        data: Optional[Any] = None,
        code: str = "CREATED"
    ) -> Response:
        """
        Return a resource creation response (201)
        
        Args:
            message: Success message
            data: Created resource data
            code: Custom code for frontend
            
        Returns:
            DRF Response object with 201 status
        """
        return APIResponse.success(
            message=message,
            data=data,
            status_code=status.HTTP_201_CREATED,
            code=code
        )

    @staticmethod
    def error(
        message: str,
        errors: Optional[Any] = None,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        code: str = "ERROR",
        error_detail: Optional[str] = None
    ) -> Response:
        """
        Return an error API response
        
        Args:
            message: User-friendly error message
            errors: Validation errors or error details (dict or list)
            status_code: HTTP status code
            code: Custom error code for frontend handling
            error_detail: Additional error details for debugging
            
        Returns:
            DRF Response object
        """
        response_data = {
            "success": False,
            "message": message,
            "data": None,
            "errors": errors,
            "code": code
        }
        
        if error_detail:
            response_data["error_detail"] = error_detail
        
        return Response(response_data, status=status_code)

    @staticmethod
    def validation_error(
        message: str = "Validation failed",
        errors: Optional[Dict] = None,
        code: str = "VALIDATION_ERROR"
    ) -> Response:
        """
        Return a validation error response (400)
        
        Args:
            message: Error message
            errors: Dictionary of field validation errors
            code: Error code
            
        Returns:
            DRF Response object with 400 status
        """
        return APIResponse.error(
            message=message,
            errors=errors,
            status_code=status.HTTP_400_BAD_REQUEST,
            code=code
        )

    @staticmethod
    def not_found(
        message: str = "Resource not found",
        code: str = "NOT_FOUND"
    ) -> Response:
        """
        Return a not found error response (404)
        
        Args:
            message: Error message
            code: Error code
            
        Returns:
            DRF Response object with 404 status
        """
        return APIResponse.error(
            message=message,
            status_code=status.HTTP_404_NOT_FOUND,
            code=code
        )

    @staticmethod
    def unauthorized(
        message: str = "Authentication required",
        code: str = "UNAUTHORIZED"
    ) -> Response:
        """
        Return an unauthorized error response (401)
        
        Args:
            message: Error message
            code: Error code
            
        Returns:
            DRF Response object with 401 status
        """
        return APIResponse.error(
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED,
            code=code
        )

    @staticmethod
    def forbidden(
        message: str = "Permission denied",
        code: str = "FORBIDDEN"
    ) -> Response:
        """
        Return a forbidden error response (403)
        
        Args:
            message: Error message
            code: Error code
            
        Returns:
            DRF Response object with 403 status
        """
        return APIResponse.error(
            message=message,
            status_code=status.HTTP_403_FORBIDDEN,
            code=code
        )

    @staticmethod
    def conflict(
        message: str,
        errors: Optional[Any] = None,
        code: str = "CONFLICT"
    ) -> Response:
        """
        Return a conflict error response (409)
        Used for duplicate records or constraint violations
        
        Args:
            message: Error message
            errors: Conflict details
            code: Error code
            
        Returns:
            DRF Response object with 409 status
        """
        return APIResponse.error(
            message=message,
            errors=errors,
            status_code=status.HTTP_409_CONFLICT,
            code=code
        )

    @staticmethod
    def internal_error(
        message: str = "Internal server error",
        error_detail: Optional[str] = None,
        code: str = "INTERNAL_ERROR"
    ) -> Response:
        """
        Return an internal server error response (500)
        
        Args:
            message: User-friendly error message
            error_detail: Technical error details (should not be exposed in production)
            code: Error code
            
        Returns:
            DRF Response object with 500 status
        """
        return APIResponse.error(
            message=message,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            code=code,
            error_detail=error_detail
        )

    @staticmethod
    def paginated(
        message: str,
        data: List[Any],
        page: int,
        page_size: int,
        total_count: int,
        status_code: int = status.HTTP_200_OK,
        code: str = "SUCCESS"
    ) -> Response:
        """
        Return a paginated response
        
        Args:
            message: Success message
            data: Paginated data list
            page: Current page number
            page_size: Items per page
            total_count: Total number of items
            status_code: HTTP status code
            code: Custom code
            
        Returns:
            DRF Response object with pagination metadata
        """
        total_pages = (total_count + page_size - 1) // page_size
        
        return Response(
            {
                "success": True,
                "message": message,
                "data": data,
                "pagination": {
                    "page": page,
                    "page_size": page_size,
                    "total_count": total_count,
                    "total_pages": total_pages,
                    "has_next": page < total_pages,
                    "has_previous": page > 1
                },
                "errors": None,
                "code": code
            },
            status=status_code
        )

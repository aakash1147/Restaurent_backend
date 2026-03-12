"""
Custom exception classes for the application.
Provides standardized error handling across the API.
"""

from rest_framework.exceptions import APIException
from rest_framework import status


class BaseAPIException(APIException):
    """
    Base exception class for all custom API exceptions.
    Provides consistent error response structure.
    """
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "An error occurred"
    default_code = "error"

    def __init__(self, detail=None, code=None, error_code=None):
        if detail is None:
            detail = self.default_detail
        if code is None:
            code = self.default_code
        
        super().__init__(detail=detail, code=code)
        self.error_code = error_code or code


class ValidationException(BaseAPIException):
    """Raised when input validation fails"""
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Validation failed"
    default_code = "validation_error"


class DuplicateRecordException(BaseAPIException):
    """Raised when trying to create a record that already exists (uniqueness violation)"""
    status_code = status.HTTP_409_CONFLICT
    default_detail = "A record with this information already exists"
    default_code = "duplicate_record"


class UserAlreadyExistsException(DuplicateRecordException):
    """Raised when username or email already exists"""
    default_detail = "User with this username or email already exists"
    default_code = "user_already_exists"


class CompanyAlreadyExistsException(DuplicateRecordException):
    """Raised when company with the same name already exists"""
    default_detail = "A company with this name already exists"
    default_code = "company_already_exists"


class RegistrationException(BaseAPIException):
    """Raised when registration process fails"""
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Registration failed. Please check your input and try again"
    default_code = "registration_failed"


class ResourceNotFoundException(BaseAPIException):
    """Raised when a requested resource is not found"""
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "Resource not found"
    default_code = "not_found"


class UnauthorizedException(BaseAPIException):
    """Raised when user is not authenticated"""
    status_code = status.HTTP_401_UNAUTHORIZED
    default_detail = "Authentication required"
    default_code = "unauthorized"


class PermissionDeniedException(BaseAPIException):
    """Raised when user doesn't have permission to perform action"""
    status_code = status.HTTP_403_FORBIDDEN
    default_detail = "You don't have permission to perform this action"
    default_code = "permission_denied"


class InternalServerException(BaseAPIException):
    """Raised for internal server errors"""
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = "An internal server error occurred"
    default_code = "internal_error"


class DataIntegrityException(BaseAPIException):
    """Raised when database integrity constraints are violated"""
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Data integrity error. Please check your input"
    default_code = "integrity_error"

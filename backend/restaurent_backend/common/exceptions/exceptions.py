"""
Service-level custom exceptions for business logic errors.
These exceptions represent domain-specific failures, separate from API/HTTP concerns.
"""


class ServiceException(Exception):
    """Base exception for all service-level errors."""
    
    def __init__(self, message, error_code=None, details=None):
        """
        Initialize service exception.
        
        Args:
            message (str): User-friendly error message
            error_code (str): Machine-readable error code for clients
            details (dict): Additional error context/details
        """
        self.message = message
        self.error_code = error_code or self.__class__.__name__
        self.details = details or {}
        super().__init__(self.message)


class CompanyCreationFailedException(ServiceException):
    """Raised when company creation fails."""
    pass


class BusinessLocationCreationFailedException(ServiceException):
    """Raised when business location creation fails."""
    pass


class UserCreationFailedException(ServiceException):
    """Raised when user creation fails."""
    pass


class InvalidPasswordException(ServiceException):
    """Raised when password doesn't meet security requirements."""
    pass


class InvalidRegistrationDataException(ServiceException):
    """Raised when registration data is invalid or incomplete."""
    pass


class DuplicateUserException(ServiceException):
    """Raised when user with same username/email already exists."""
    pass


class DuplicateCompanyException(ServiceException):
    """Raised when company with same name already exists."""
    pass


class RegistrationWorkflowException(ServiceException):
    """Raised when the registration workflow encounters an error."""
    pass


class TransactionFailedException(ServiceException):
    """Raised when database transaction fails."""
    pass


class DataIntegrityException(ServiceException):
    """Raised when data integrity constraints are violated."""
    pass

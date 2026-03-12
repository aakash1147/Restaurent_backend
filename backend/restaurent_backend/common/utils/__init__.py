"""
Common API utilities: exceptions, response handlers, and exception handlers
"""

from .exceptions import (
    BaseAPIException,
    ValidationException,
    DuplicateRecordException,
    UserAlreadyExistsException,
    CompanyAlreadyExistsException,
    RegistrationException,
    ResourceNotFoundException,
    UnauthorizedException,
    PermissionDeniedException,
    InternalServerException,
    DataIntegrityException,
)

from .response import APIResponse

from .exception_handler import custom_exception_handler

__all__ = [
    'BaseAPIException',
    'ValidationException',
    'DuplicateRecordException',
    'UserAlreadyExistsException',
    'CompanyAlreadyExistsException',
    'RegistrationException',
    'ResourceNotFoundException',
    'UnauthorizedException',
    'PermissionDeniedException',
    'InternalServerException',
    'DataIntegrityException',
    'APIResponse',
    'custom_exception_handler',
]

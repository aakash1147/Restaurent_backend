"""
Result objects for service layer returns.
Provides type-safe, self-documenting results instead of raw dicts/tuples.
"""

from .base import ResultBase, SuccessResult, ErrorResult
from .registration import RegistrationResult, RegistrationErrorResult, registration_success_result, registration_error_result
from .validation import ValidationResult
from .factory import success, error

__all__ = [
    'ResultBase',
    'SuccessResult',
    'ErrorResult',
    'RegistrationResult',
    'RegistrationErrorResult',
    'ValidationResult',
    'success',
    'error',
    'registration_success_result',
    'registration_error_result',
]

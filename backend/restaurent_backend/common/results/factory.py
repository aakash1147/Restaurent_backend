"""
Generic factory functions for creating result objects.
"""

from typing import Any

from .base import SuccessResult, ErrorResult


def success(message: str, data: Any = None, **kwargs) -> SuccessResult:
    """Factory function for successful results."""
    return SuccessResult(success=True, message=message, data=data, **kwargs)


def error(message: str, error_code: str = None, **kwargs) -> ErrorResult:
    """Factory function for error results."""
    return ErrorResult(success=False, message=message, error_code=error_code, **kwargs)

"""
Validation-specific result classes.
"""

from typing import Any, Dict
from dataclasses import dataclass, field

from .base import SuccessResult


@dataclass
class ValidationResult(SuccessResult):
    """Result for validation operations."""
    
    is_valid: bool = True
    validation_errors: Dict[str, Any] = field(default_factory=dict)
    
    def __post_init__(self):
        super().__post_init__()
        if not self.is_valid:
            self.success = False

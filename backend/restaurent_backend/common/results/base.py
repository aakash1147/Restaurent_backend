from abc import ABC, abstractmethod
from typing import Any, Optional, Dict
from dataclasses import dataclass, field


@dataclass
class ResultBase(ABC):
    """Base class for all operation results."""
    
    success: bool
    message: str
    error_code: Optional[str] = None
    details: Dict[str, Any] = field(default_factory=dict)
    
    @abstractmethod
    def is_successful(self) -> bool:
        """Check if operation was successful."""
        pass

@dataclass
class SuccessResult(ResultBase):
    """Result representing successful operation."""
    
    data: Any = None
    
    def __post_init__(self):
        self.success = True
        if not self.message:
            self.message = "Operation completed successfully"
    
    def is_successful(self) -> bool:
        return True


@dataclass
class ErrorResult(ResultBase):
    """Result representing failed operation."""
    
    def __post_init__(self):
        self.success = False
    
    def is_successful(self) -> bool:
        return False
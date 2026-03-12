from typing import Any, Optional, Dict
from dataclasses import dataclass

from .base import SuccessResult, ErrorResult

@dataclass
class RegistrationResult(SuccessResult):
    user_data: Optional[Dict[str, Any]] = None
    company_data: Optional[Dict[str, Any]] = None
    business_location_data: Optional[Dict[str, Any]] = None
    
    def get_combined_data(self) -> Dict[str, Any]:
        return {
            'user': self.user_data,
            'company': self.company_data,
            'business_location': self.business_location_data
        }

def registration_success_result(user_data: Dict[str, Any], company_data: Dict[str, Any], business_location_data: Dict[str, Any], message: str = "User registration successful") -> RegistrationResult:
    return RegistrationResult(success=True, message=message, user_data=user_data, company_data=company_data, business_location_data=business_location_data)
    
@dataclass
class RegistrationErrorResult(ErrorResult):
    failed_step: Optional[str] = None  # 'company', 'location', 'user'
    user_data: Optional[Dict[str, Any]] = None  # Partial data if partial success
    company_data: Optional[Dict[str, Any]] = None


def registration_error_result(message: str, failed_step: str = None, error_code: str = None, details: Dict[str, Any] = None) -> RegistrationErrorResult:
    return RegistrationErrorResult(success=False, message=message, failed_step=failed_step, error_code=error_code or 'REGISTRATION_FAILED', details=details)
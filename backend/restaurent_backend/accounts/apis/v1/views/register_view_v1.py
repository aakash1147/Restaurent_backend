from rest_framework.views import APIView, Response
from rest_framework import status
from common.mixins import APIViewMixin, SuccessResponseMixin
from accounts.apis.v1.serializers import UserRegistrationSerializerV1
from accounts.services import RegistrationService
from common.utils.response import APIResponse

import logging


logger = logging.getLogger(__name__)

class RegistrationViewV1(APIView, APIViewMixin, SuccessResponseMixin):
    
    def post(self, request):
        self.log_request(logger, request, {'action': 'user_registration'})
        
        serializer = UserRegistrationSerializerV1(data=request.data)
        logger.debug(f"Serializer initialized for registration")
        
        # Step 1: Validate input data
        if not serializer.is_valid():
            self.log_error(logger, serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Step 2: Execute business logic via service layer (returns Result object)
        registration_result = RegistrationService.register_user(serializer.validated_data)
        
        # Determine appropriate HTTP status code based on error
        if not registration_result.is_successful():
            # Handle registration error
            self.log_error(logger, f"Registration failed: {registration_result.message}", extra={'error_code': registration_result.error_code, 'failed_step': registration_result.failed_step if hasattr(registration_result, 'failed_step') else None})
            
            if 'DUPLICATE' in registration_result.error_code:
                return APIResponse.conflict(message=registration_result.message, code=registration_result.error_code)
            else:
                return APIResponse.validation_error(message=registration_result.message, code=registration_result.error_code, details=registration_result.details)
                
        # Step 4: Format success response with result data
        response_data = {
            'user': registration_result.user_data,
            'company': registration_result.company_data,
            'business_location': registration_result.business_location_data
        }
        
         # Step 5: Return formatted response using mixin
        logger.info(f"Registration successful for user: {registration_result.user_data.get('user_ext_id')}")
        self.log_response(logger, status.HTTP_201_CREATED, "Registration successful", {'user_id': registration_result.user_data.get('user_ext_id')})
        
        return self.created_response(data=response_data, message=registration_result.message, code="REGISTRATION_SUCCESS")
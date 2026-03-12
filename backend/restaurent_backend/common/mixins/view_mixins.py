from rest_framework import status
from common.utils.response import APIResponse

class SuccessResponseMixin:
    """
    Mixin for views that provides enterprise-level response handling.
    
    Automatically formats success responses with consistent structure.
    
    Usage:
        class MyView(SuccessResponseMixin, APIView):
            def post(self, request):
                # Do business logic
                response_data = {'key': 'value'}
                return self.success_response(
                    data=response_data,
                    message="Operation successful",
                    status_code=status.HTTP_201_CREATED
                )
    """
    
    def success_response(self, data=None, message="Operation completed successfully", status_code=status.HTTP_200_OK, code="SUCCESS"):
        """
        Return a standardized success response.
        
        Args:
            data: Response data payload
            message: User-friendly success message
            status_code: HTTP status code
            code: Error code for frontend
        """
        return APIResponse.success(
            message=message,
            data=data,
            status_code=status_code,
            code=code
        )
    
    def created_response(self, data=None, message="Resource created successfully", code="CREATED"):
        """Shortcut for 201 Created response"""
        return self.success_response(
            data=data,
            message=message,
            status_code=status.HTTP_201_CREATED,
            code=code
        )

class APIViewMixin:
    """Mixin for API views to provide common functionality."""
    
    def get_client_ip(self, request):
        """Retrieves the client's IP address from the request."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def log_request(self, logger, request, extra_info=None):
        """Logs the incoming request with optional extra information."""
        log_data = {
            'method': request.method,
            'path': request.path,
            'ip': self.get_client_ip(request),
            'user': request.user.username if request.user.is_authenticated else 'anonymous',
        }
        if extra_info:
            log_data.update(extra_info)
        
        logger.info(f"Received request: {log_data}")
        return log_data
    
    def log_info(self, logger, message, extra_info=None):
        """Logs an informational message with optional extra information."""
        log_data = message
        if extra_info:
            log_data.update(extra_info)
        
        logger.info(f"Info: {log_data}")
        return log_data
    
    def log_error(self, logger, message, extra_info=None):
        """Logs an error message with optional extra information."""
        log_data = message
        if extra_info:
            log_data.update(extra_info)
        
        logger.error(f"Error: {log_data}")
        return log_data
    
    def log_response(self, logger, status_code, message, additional_info=None):
        """Log outgoing response with context"""
        log_data = {
            'status_code': status_code,
            'message': message,
        }
        if additional_info:
            log_data.update(additional_info)
        
        logger.info(f"Response: {log_data}")
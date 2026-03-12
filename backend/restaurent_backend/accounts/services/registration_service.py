from django.db import transaction, IntegrityError
from accounts.models import User
from companys.models import Company, BusinessLocation
from common.exceptions import CompanyCreationFailedException, BusinessLocationCreationFailedException, UserCreationFailedException, RegistrationWorkflowException, DataIntegrityException
from common.results import registration_success_result, registration_error_result

import logging

logger = logging.getLogger(__name__)

class RegistrationService:
    
    @staticmethod
    def register_user(registration_data):
        
        logger.info(f"Registering user with data: {registration_data}")
        try:
            with transaction.atomic():
                # Step 1: Create Company        
                logger.info("[RegistrationService] Step 1: Creating company")
                company = RegistrationService._create_company(registration_data['company'])
                logger.info(f"Company created with ID: {company}")
                
                # Step 2: Create Business Location         
                logger.info("[RegistrationService] Step 2: Creating business location")
                location = RegistrationService._create_business_location(company, registration_data['business_location'])
                logger.info(f"Business location created with ID: {location}")
                
                # Step 3: Create User         
                logger.info("[RegistrationService] Step 3: Creating user")
                user = RegistrationService._create_user(company, location, registration_data['user'])
                logger.info(f"User created with ID: {user}")                    

                return registration_success_result(user_data= RegistrationService._serialize_user(user), company_data= RegistrationService._serialize_company(company), business_location_data= RegistrationService._serialize_business_location(location), message="User registration successful")
                
        except (CompanyCreationFailedException, BusinessLocationCreationFailedException, UserCreationFailedException, DataIntegrityException, RegistrationWorkflowException) as e:
            logger.error(f"[RegistrationService] Service exception during registration: {str(e)}", exc_info=True)
            return registration_error_result(
                message=e.message,
                failed_step=RegistrationService._determine_failed_step(e),
                error_code=e.error_code,
                details=e.details
            )
        except Exception as e:
            logger.error(f"[RegistrationService] Unexpected error during registration: {str(e)}", exc_info=True)
            return registration_error_result(
                message="An unexpected error occurred during registration",
                error_code="REGISTRATION_FAILED",
                details={'error': str(e)}
            )
        
        
    @staticmethod
    def _create_company(company_data: dict) -> Company:
        logger.info(f"Creating company with data: {company_data}")
        try:
            company = Company.objects.create(**company_data)
            logger.info(f"=========================> Company created =====>: {company}")
            return company
        except IntegrityError as e:
            logger.error(f"Data integrity error while creating company: {str(e)}")
            raise DataIntegrityException(message=f"Company creation failed: duplicate company name", error_code="DUPLICATE_COMPANY", details={'field': 'company_name', 'error': str(e)})
        except Exception as e:
            logger.error(f"Unexpected error while creating company: {str(e)}")
            raise CompanyCreationFailedException(message=f"Company creation failed: {str(e)}", error_code="COMPANY_CREATION_FAILED", details={'error': str(e)})
    
    @staticmethod
    def _create_business_location(company, location_data: dict) -> BusinessLocation:
        logger.info(f"Creating business location with data: {location_data} for company ID: {company.id}")
        try:
            location = BusinessLocation.objects.create(company=company, **location_data)
            logger.info(f"=========================> Business location created =====>: {location}")
            return location
        except Exception as e:
            logger.error(f"Unexpected error while creating business location: {str(e)}")
            raise CompanyCreationFailedException(message=f"Business location creation failed: {str(e)}", error_code="BUSINESS_LOCATION_CREATION_FAILED", details={'error': str(e)})

    @staticmethod
    def _create_user(company, location, user_data: dict) -> User:
        logger.info(f"Creating user with data: {user_data} for company ID: {company.id} and location ID: {location.id}")
        try:
            # Use create_user() to properly hash the password
            user = User.objects.create_user(company=company, bussiness_location=location, **user_data)
            logger.info(f"=========================> User created =====>: {user}")
            return user
        except IntegrityError as e:
            raise DataIntegrityException(message=f"User creation failed: username or email already exists", error_code="DUPLICATE_USER", details={'error': str(e)})
        except Exception as e:
            logger.error(f"Unexpected error while creating user: {str(e)}")
            raise CompanyCreationFailedException(message=f"User creation failed: {str(e)}", error_code="USER_CREATION_FAILED", details={'error': str(e)})
        
    @staticmethod
    def _serialize_user(user):
        return {
            'id': user.id,
            'user_ext_id': str(user.user_ext_id),
            'username': user.username,
            'email': user.email,
            'phone_number': user.phone_number or '',
            'date_of_birth': str(user.date_of_birth) if user.date_of_birth else None,
        }
        
    @staticmethod
    def _serialize_company(company):
        return {
            'id': company.id,
            'company_ext_id': str(company.company_ext_id),
            'name': company.name,
            'description': company.description or '',
            'website': company.website or '',            
        }
        
    @staticmethod
    def _serialize_business_location(location):
        return {
            'id': location.id,
            'business_location_ext_id': str(location.business_location_ext_id),
            'address_line1': location.address_line1 or '',
            'address_line2': location.address_line2 or '',
            'city': location.city or '',
            'state': location.state or '',
            'postal_code': location.postal_code or '',
            'country': location.country or '',
        }
        
    @staticmethod
    def _determine_failed_step(exception):
        if isinstance(exception, CompanyCreationFailedException):
            return 'company'
        elif isinstance(exception, BusinessLocationCreationFailedException):
            return 'location'
        elif isinstance(exception, UserCreationFailedException):
            return 'user'
        else:
            return 'unknown'
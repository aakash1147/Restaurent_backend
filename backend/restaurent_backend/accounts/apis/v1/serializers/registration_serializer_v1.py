from rest_framework import serializers
from companys.apis.v1.serializers import CreateCompanySerializerV1, CreateBusinessLocationSerializerV1
from accounts.apis.v1.serializers import CreateUserSerializerV1

class UserRegistrationSerializerV1(serializers.Serializer):
    
    company = CreateCompanySerializerV1(required=True)
    business_location = CreateBusinessLocationSerializerV1(required=True)
    user = CreateUserSerializerV1(required=True)
    
from rest_framework import serializers
from companys.apis.common.serializer import BaseCompanySerializer
from companys.models import Company

class CompanySerializerV1(BaseCompanySerializer):
    pass

class CreateCompanySerializerV1(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'description', 'website', 'logo']
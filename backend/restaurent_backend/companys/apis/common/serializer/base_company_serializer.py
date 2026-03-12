from rest_framework import serializers
from companys.models import Company

class BaseCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['company_id', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['company_id', 'created_at', 'updated_at']
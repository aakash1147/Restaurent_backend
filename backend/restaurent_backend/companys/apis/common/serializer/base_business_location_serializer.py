from rest_framework import serializers
from companys.models import BusinessLocation

class BaseBusinessLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessLocation
        fields = ['business_location_ext_id', 'company', 'address', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at']
        read_only_fields = ['business_location_ext_id', 'created_at', 'updated_at']
from rest_framework import serializers
from accounts.models import Address

class BaseAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['address_id', 'user', 'street', 'city', 'state', 'postal_code', 'country', 'created_at', 'updated_at']
        read_only_fields = ['address_id', 'created_at', 'updated_at']
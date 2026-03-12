from rest_framework import serializers
from companys.apis.common.serializer import BaseBusinessLocationSerializer
from companys.models import BusinessLocation

class BusinessLocationSerializerV1(BaseBusinessLocationSerializer):
    pass

class CreateBusinessLocationSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = BusinessLocation
        fields = ['address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country']
from accounts.apis.common.serializers import BaseAddressSerializer
from accounts.models import Address

class AddressSerializerV1(BaseAddressSerializer):
    pass

    def create(self, validated_data):
        address = Address.objects.create(**validated_data)
        return address
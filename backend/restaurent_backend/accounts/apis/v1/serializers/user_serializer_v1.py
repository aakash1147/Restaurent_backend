from rest_framework import serializers
from accounts.apis.common.serializers import BaseUserSerializer
from accounts.models import User

class UserSerializerV1(BaseUserSerializer):
    pass

class CreateUserSerializerV1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
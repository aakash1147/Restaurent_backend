from rest_framework import serializers
from accounts.models import User

class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'username', 'email', 'phone_number', 'date_of_birth', 'created_at', 'updated_at']
        read_only_fields = ['user_id', 'created_at', 'updated_at']
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from companys.models import Company, BusinessLocation
import uuid
import re

def generate_user_id():
    return f"U-{uuid.uuid4()}"

class User(AbstractUser):
    user_ext_id = models.TextField(max_length=255, unique=True, editable=False, default=generate_user_id, verbose_name='User ID')
    
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees', verbose_name='Company')
    bussiness_location = models.ForeignKey(BusinessLocation, on_delete=models.SET_NULL, null=True, blank=True, related_name='users', verbose_name='Business Location')
    
    phone_number = models.CharField(max_length=20, blank=True, null=True, verbose_name='Phone Number')
    date_of_birth = models.DateField(blank=True, null=True, verbose_name='Date of Birth')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated At')
    
    class Meta:
        unique_together = ('username', 'email')
        constraints = [
            models.UniqueConstraint(fields=['username'], name='unique_username', violation_error_message='A user with this username already exists.'),
            models.UniqueConstraint(fields=['email'], name='unique_email', violation_error_message='A user with this email already exists.'),
        ]
    
    def clean(self):
        """Model Level Validation to ensure unique username and email."""
        super().clean()
        
        # Username uniqueness
        if User.objects.exclude(pk=self.pk).filter(username=self.username).exists():
            raise ValidationError({'username': 'A user with this username already exists.'})
        
        # Email uniqueness
        if User.objects.exclude(pk=self.pk).filter(email=self.email).exists():
            raise ValidationError({'email': 'A user with this email already exists.'})
        
        # Password validation (if password is being set)
        if self.password:
            if len(self.password) < 8:
                raise ValidationError({'password': 'Password must be at least 8 characters long.'})
            if not re.search(r'[A-Z]', self.password):
                raise ValidationError({'password': 'Password must contain at least one uppercase letter.'})
            if not re.search(r'\d', self.password):
                raise ValidationError({'password': 'Password must contain at least one digit.'})
            if not re.search(r'[!@#$%^&*(),.?":{}|<>]', self.password):
                raise ValidationError({'password': 'Password must contain at least one special character.'})

    
    
    def __str__(self):
        return self.username

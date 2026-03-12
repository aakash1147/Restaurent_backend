from django.db import models
from django.conf import settings
import uuid

def generate_address_id():
    return f"A-{uuid.uuid4()}"

class Address(models.Model):
    address_ext_id = models.TextField(max_length=255, unique=True, editable=False, default=generate_address_id, verbose_name='Address ID')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='addresses', verbose_name='User')
    street = models.CharField(max_length=255, verbose_name='Street')
    city = models.CharField(max_length=100, verbose_name='City')
    state = models.CharField(max_length=100, verbose_name='State')
    postal_code = models.CharField(max_length=20, verbose_name='Postal Code')
    country = models.CharField(max_length=100, verbose_name='Country')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated At')

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}, {self.postal_code}, {self.country}"
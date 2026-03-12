from django.db import models
from .company import Company
import uuid

def generate_bussiness_location_ext_id():
    return f"BL-{uuid.uuid4()}"

class BusinessLocation(models.Model):
    business_location_ext_id = models.TextField(max_length=255, unique=True, editable=False, default=generate_bussiness_location_ext_id, verbose_name='Business Location ID')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='locations', verbose_name='Company')
    address_line1 = models.CharField(max_length=255, verbose_name='Address Line 1')
    address_line2 = models.CharField(max_length=255, blank=True, null=True, verbose_name='Address Line 2')
    city = models.CharField(max_length=100, verbose_name='City')
    state = models.CharField(max_length=100, verbose_name='State')
    postal_code = models.CharField(max_length=20, verbose_name='Postal Code')
    country = models.CharField(max_length=100, verbose_name='Country')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created At')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Updated At')

    def __str__(self):
        return f"{self.address_line1}, {self.city}, {self.state}, {self.country}"
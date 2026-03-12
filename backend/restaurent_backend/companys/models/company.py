from django.db import models
from django.core.exceptions import ValidationError
import uuid

def generate_company_ext_id():
    return f"C-{uuid.uuid4()}"

class Company(models.Model):
    company_ext_id = models.TextField(max_length=255, unique=True, editable=False, default=generate_company_ext_id, verbose_name='Company ID')
    name = models.CharField(max_length=255, unique=True, verbose_name='Company Name')
    description = models.TextField(blank=True, null=True, verbose_name='Company Description')
    website = models.URLField(blank=True, null=True, verbose_name='Company Website')
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True, verbose_name='Company Logo')
    
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name'], name='unique_company_name', violation_error_message='A company with this name already exists.'),
        ]
    
    def clean(self):
        """Model-level validation"""
        super().clean()
        
        # Validate company name uniqueness
        if Company.objects.filter(name=self.name).exclude(pk=self.pk).exists():
            raise ValidationError({'name': 'A company with this name already exists.'})

    def __str__(self):
        return self.name
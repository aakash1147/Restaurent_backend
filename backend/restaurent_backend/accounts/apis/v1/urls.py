from django.urls import path
from .views import RegistrationViewV1

urlpatterns = [
    path('register/', RegistrationViewV1.as_view(), name='user-registration-v1'),
]
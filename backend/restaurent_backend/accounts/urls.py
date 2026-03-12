from django.urls import path, include

urlpatterns = [
    path('v1/', include('accounts.apis.v1.urls')),
]
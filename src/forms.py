from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import fournisseur

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = fournisseur
        fields = ('username', 'email')

class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = fournisseur
        fields = ('username', 'email')
from rest_framework import serializers
from . import models

from rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from allauth.account.adapter import get_adapter

class CatSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Categories
        fields = '__all__'


class FourSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.fournisseur
        fields = '__all__'

class ZoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.zone
        fields = '__all__'

class SecteurSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.secteur
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.fournisseur
        fields = '__all__'

class CustomRegisterUserSerializer(RegisterSerializer):
    class Meta:
        model = models.fournisseur
        fields = ('username','code','password')



class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('key','user')




class DemSerializer(serializers.ModelSerializer):

    #fournisseur = RecSerializer(many=True)
    class Meta:
        model = models.Demander
        fields = ('telephones_idtelephones','description')



class RecSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Recu
        fields = ('demander_iddemander','idfournisseur')













from .models import *
from .serializers import *
from rest_framework import *

from rest_framework.generics import RetrieveAPIView,ListAPIView
from rest_framework.response import Response
import random
import string
from .serializers import *

def id_generator(size=4, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

class CatViewset(viewsets.ModelViewSet):

    queryset = Categories.objects.all()
    serializer_class = CatSerializer

class Zoneapi(viewsets.ModelViewSet):
    queryset=zone.objects.all()
    serializer_class= ZoneSerializer

class Secteurapi(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        tab=[]
        secteurs=secteur.objects.filter(idzone_id=pk)
        for ss in secteurs:
            tab.append({'numsecteur':ss.numsecteur})
        return Response(tab)

class post_list(viewsets.ViewSet):



    def list(self,request):
        tab=[]
        tab2=[]
        a = Categories.objects.filter(parent__isnull=True)

        for i in a:
            if Categories.objects.filter(parent=i).count() != 0:
                compteur = Classer.objects.filter(categories_idcategories = i).count()
                fournisr = Classer.objects.filter(categories_idcategories = i)
                for fournisrs in fournisr:
                    tab2.append({"idfournisseur":fournisrs.idfournisseur.id})
                tab.append({"libelle":i.libelle,"idcategories":i.idcategories,"compteur":compteur,"fournisseurs":tab2})

        return Response({'tab':tab})

    def retrieve(self, request, pk=None):

        tab=[]
        tab2=[]
        tab3=[]
        #tab4={}
        leparent = Categories.objects.get(idcategories=pk)
        a = Categories.objects.filter(parent = leparent)

#info de la categorie selectionnée
        compteur2 = Classer.objects.filter(categories_idcategories = leparent).count()
        mesfournisseurs = Classer.objects.filter(categories_idcategories = leparent)
        for fournisse in mesfournisseurs:
            tab3.append(fournisse.idfournisseur.id)

        #tab4['fournisseurs']=tab3,
        tab4={'fournisseurs':tab3,'compteur':compteur2}
        #tab4={'compteur':compteur2}


#infos des enfants de la categorie selectionnee--------
        for i in a:
            compteur = Classer.objects.filter(categories_idcategories = i).count()
            fournisr = Classer.objects.filter(categories_idcategories = i)
            for fournisrs in fournisr:
                tab2.append(fournisrs.idfournisseur.id)
            tab.append({"libelle":i.libelle , "idcategories":i.idcategories,"compteur":compteur,"parent":pk,"fournisseurs":tab2})

        return Response({'tab':tab,'info':tab4})

class createfourbyphone(viewsets.ViewSet):

    serializer_class =FourSerializer

    def create(self,request):

        cde = id_generator()
        username = nomcde
        password = passcde
        telephone = request.POST['telephone']
        mdp = make_password(password)
        creationf=fournisseur.objects.create(username=username,password=mdp,telephone=telephone,code=cde)
        creationf.save()

        return Response({'reponse':"ok"})
        #chargement(200,creationf)
        #creationf.save()

class Retrouvetoutuserbycode(viewsets.ModelViewSet):
    queryset=fournisseur.objects.all()
    serializer_class=FourSerializer
    lookup_field = "code"


class Envoidemande(viewsets.ModelViewSet):

    queryset=Demander.objects.all()
    serializer_class=DemSerializer

    def create(self, request):

        data = request.data

        demandeur = fournisseur.objects.get(id=request.data["telephones_idtelephones"])
        demande = Demander.objects.create(telephones_idtelephones=demandeur,description=request.data['description'])
        demande.save()
        for fournisseurs in request.data['fournisseur']:
            fournisseurss = fournisseur.objects.get(id=fournisseurs)
            Reception = Recu.objects.create(demander_iddemander=demande,idfournisseur=fournisseurss)
            Reception.save

        return Response({'iddemande':demande.iddemander})




class Infopourencaissement(viewsets.ViewSet):

    def list(self,request):
        czone=[]

        tab=[]

        zones=zone.objects.all()

        for ezones in zones:
            csecteur=[]
            secteurs=secteur.objects.filter(idzone_id=ezones)
            for esecteurs in secteurs:
                csecteur.append(esecteurs.numsecteur)
            czone.append({'nomzone':ezones.numzone,'secteurs':csecteur})
        tab.append(czone)

        return Response(tab)

class Creationcontribuable(viewsets.ViewSet):

    def create(self, request):
        data = request.data
        sec=secteur.objects.get(numsecteur=request.data["secteurselect"])
        cont=Contribuables.objects.create(raison_sociale=request.data["raison_sociale"],activite=request.data["activite"],type=request.data["type"],Montant=request.data["Montant"],contact=request.data["contact"],secteurs=sec)
        cont.save()
        zon=zone.objects.get(idzone=request.data["zoneselec"])
        cont=Contribuables.objects.create(matricule=zon.numzone+request.data["secteurselect"]+str(cont.cont_id))
        cont.save()

        return Response({'matricule':cont.matricule})

class Retrouvecontribuable(viewsets.ViewSet):
    def retrieve(self,request,pk=None):
        tab=[]
        secteurss=secteur.objects.get(numsecteur=pk)
        cont=Contribuables.objects.filter(secteurs=secteurss)
        for conts in cont:
            tab.append({'matricule':conts.matricule,'montant':conts.Montant,'nom':conts.raison_sociale})

        return Response(tab)

class Saveencaissement(viewsets.ViewSet):
    def create(self, request):
        auteur=fournisseur.objects.get(id=request.data["use_id_auteur"])
        contri=Contribuables.objects.get(matricule=request.data["use_cont_id"])
        numerorecus=Numrecu.objects.get(idnumrecu=1)
        sauvegarde=Encaissementcollect.objects.create(use_id_auteur=auteur,use_cont_id=contri,montant=contri.Montant,Numrecu=numerorecus.numerorecu)
        sauvegarde.save()

        numerorecus.numerorecu=numerorecus.numerorecu+1
        numerorecus.save()
        return Response({'Numrecu':sauvegarde.Numrecu})
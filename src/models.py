from django.contrib.auth.models import AbstractUser
from django.db import models
from trouvite import settings



class fournisseur(AbstractUser):
    #idfournisseur = models.AutoField(primary_key=True)
    #password = models.CharField(max_length=50,default="")
    #nom = models.CharField(max_length=255, blank=True, null=True)
    #prenom = models.CharField(max_length=255, blank=True, null=True)
    #raison_social = models.CharField(max_length=255, blank=True, null=True)
    statut_juridique = models.CharField(max_length=255, blank=True, null=True)
    code = models.CharField(max_length=4, blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    verifie = models.BooleanField(default=False)
    types = models.CharField(max_length=255, blank=True, null=True)


    #def __str__(self):
        #return self.username
    class Meta:

        db_table = 'fournisseur'

class Contribuables(models.Model):
    cont_id = models.AutoField(primary_key=True)
    matricule = models.CharField(max_length=8, blank=True, null=True)
    raison_sociale = models.CharField(max_length=100, blank=True, null=True)
    secteurs = models.ForeignKey('secteur', models.DO_NOTHING, db_column='secteurs',null=True)
    positiongps = models.CharField(max_length=100, blank=True, null=True)
    activite = models.CharField(max_length=100, blank=True, null=True)
    type = models.CharField(max_length=20, blank=True, null=True)
    Montant = models.CharField(max_length=100, blank=True, null=True)
    contact = models.CharField(max_length=8, blank=True, null=True)

class Services(models.Model):
    serv_id = models.AutoField(primary_key=True)
    libelle = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=30, blank=True, null=True)
    categorie = models.CharField(max_length=30, blank=True, null=True)
    type = models.CharField(max_length=30, blank=True, null=True)

class zone(models.Model):
    idzone = models.AutoField(primary_key=True)
    numzone = models.CharField(max_length=30, blank=True, null=True)
    description_zon = models.CharField(max_length=30, blank=True, null=True)

class secteur(models.Model):
    idsecteur = models.AutoField(primary_key=True)
    numsecteur = models.CharField(max_length=30, blank=True, null=True)
    description_sec = models.CharField(max_length=30, blank=True, null=True)
    idzone_id  = models.ForeignKey('zone', models.DO_NOTHING, db_column='idzone_id',null=True)

class Encaissementcollect(models.Model):
    idencaissement = models.AutoField(primary_key=True)
    date = models.CharField(max_length=30, blank=True, null=True)
    montant = models.CharField(max_length=100, blank=True, null=True)
    Numrecu = models.IntegerField(default=0)
    use_id_auteur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    use_cont_id  = models.ForeignKey('Contribuables', models.DO_NOTHING, db_column='use_cont_id',null=True)

class Numrecu(models.Model):
    idnumrecu = models.AutoField(primary_key=True)
    numerorecu  = models.IntegerField()

class Sorties(models.Model):
    sort_id = models.AutoField(primary_key=True)
    serv_idf = models.ForeignKey('Services', models.DO_NOTHING, db_column='serv_idf',null=True)
    date = models.CharField(max_length=30, blank=True, null=True)
    montant = models.BigIntegerField()
    raison = models.CharField(max_length=30, blank=True, null=True)


class Categories(models.Model):
    idcategories = models.AutoField(primary_key=True)
    libelle = models.CharField(max_length=255, blank=True, null=True)
    parent = models.ForeignKey('self', related_name='+', on_delete=models.CASCADE, blank=True,null=True)

    class Meta:

        db_table = 'categories'


class Chargements(models.Model):
    idchargements = models.AutoField(primary_key=True)
    idfournisseur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    class Meta:

        db_table = 'chargements'


class Classer(models.Model):
    idclasser = models.AutoField(primary_key=True)
    categories_idcategories = models.ForeignKey(Categories, models.DO_NOTHING, db_column='categories_idcategories',null=True)
    idfournisseur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    class Meta:

        db_table = 'classer'
        #unique_together = (('categories_idcategories', 'fournisseurs_idfournisseurs'),)


class Code(models.Model):
    idcode = models.AutoField(primary_key=True)
    code = models.CharField(max_length=4, blank=True, null=True)
    class Meta:

        db_table = 'code'


class Demandes(models.Model):
    iddemandes = models.AutoField(primary_key=True)
    telephones_idtelephones = models.ForeignKey('Telephones', models.DO_NOTHING, db_column='telephones_idtelephones')
    nuagemotcle = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    dateheure = models.CharField(max_length=255, blank=True, null=True)
    codedemande = models.CharField(max_length=255, blank=True, null=True)
    class Meta:

        db_table = 'demandes'

class Demander(models.Model):
    iddemander = models.AutoField(primary_key=True)
    telephones_idtelephones = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    nuagemotcle = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    dateheure = models.CharField(max_length=255, blank=True, null=True)
    codedemande = models.CharField(max_length=255, blank=True, null=True)
    class Meta:

        db_table = 'demander'


class Fournisseurs(models.Model):
    idfournisseurs = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255, blank=True, null=True)
    prenom = models.CharField(max_length=255, blank=True, null=True)
    raison_social = models.CharField(max_length=255, blank=True, null=True)
    statut_juridique = models.CharField(max_length=255, blank=True, null=True)
    class Meta:

        db_table = 'fournisseurs'


class test(models.Model):
    idtest = models.AutoField(primary_key=True)
    class Meta:

        db_table = 'test'


class Reception(models.Model):
    idreception = models.AutoField(primary_key=True)
    demandes_iddemandes = models.ForeignKey(Demandes, models.DO_NOTHING, db_column='demandes_iddemandes',null=True)
    idfournisseur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    class Meta:

        db_table = 'reception'

class Recu(models.Model):
    idrecu = models.AutoField(primary_key=True)
    demander_iddemander = models.ForeignKey(Demander, models.DO_NOTHING, db_column='demander_iddemander',null=True)
    idfournisseur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    class Meta:

        db_table = 'recu'



class Reponses(models.Model):
    idreponses = models.AutoField(primary_key=True)
    demandes_iddemandes = models.ForeignKey(Demandes, models.DO_NOTHING, db_column='demandes_iddemandes',null=True)
    idfournisseur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    dateheure = models.CharField(max_length=255, blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    class Meta:

        db_table = 'reponses'


class Telephones(models.Model):
    idtelephones = models.AutoField(primary_key=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)
    verifie = models.BooleanField(default=False)
    code = models.CharField(max_length=4, blank=True, null=True)
    class Meta:

        db_table = 'telephones'

class Transactions(models.Model):
    idtransactions = models.AutoField(primary_key=True)
    types = models.CharField(max_length=255, blank=True, null=True)
    iddonneur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    idrecepteur = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='+', on_delete=models.CASCADE, blank=True,null=True)
    dateheure = models.CharField(max_length=255, blank=True, null=True)
    montant = models.BigIntegerField()

    class Meta:

        db_table = 'transactions'
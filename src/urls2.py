from django.urls import path
from django.conf.urls import url,include
from rest_framework.routers import DefaultRouter
from . import views
from . import api

router = DefaultRouter()
router.register('cat-viewset', api.CatViewset,'cat-viewset')
router.register('lescat', api.post_list, 'lescat')
router.register('creationtel', api.createfourbyphone, 'creationtel')
router.register('retrouvetoutuser', api.Retrouvetoutuserbycode, 'retrouvetoutuser')
router.register('envoidemande', api.Envoidemande, 'envoidemande')
router.register('infosencaissement',api.Infopourencaissement,'infosencaissement')
router.register('creationcont',api.Creationcontribuable,'creationcont')
router.register('retrouvezones',api.Zoneapi,'retrouvezones')
router.register('retrouvesecteur',api.Secteurapi,'retrouvesecteur')
router.register('retrouvecontribuable',api.Retrouvecontribuable,'retrouvecontribuable')
router.register('encaissement',api.Saveencaissement,'encaisement')

#router.register('verifcode', api.verificationcode, 'verifcode')

urlpatterns = [
    path('signup/', views.SignUpView, name='signup'),
    #path('login/', views.loginview, name='login'),

    #url('', views.loginview, name='profilfournisseur'),
    path('post/', views.post_list, name='post_list'),
    path('list/', views.listcat, name='liste'),
    path('envoi/', views.envoimessage, name='envoi'),
    path('profilphone/<int:pk>/', views.profilphone, name='profilphone'),
    #path('profilfournisseur/<int:pk>/', views.loginview, name='profilfournisseur'),
    path('enretel/', views.enregistretel, name='enretel'),
    #path('retrouve/', views.Retrouvetoutuserbycode,name="retouve"),

    url(r'profilfournisseur/$', views.loginview2, name='profilfournisseur2'),
    path('edition/', views.choix, name='edition'),
    path('enrecatforfour/', views.enregistrecatforfournisseur, name='enrecatforfour'),
    path('listedem/', views.listedemande, name='listedem'),
    path('transaction/', views.transac, name='transaction'),
    path('logout/', views.logoutview, name='logoutview'),
    url(r'',include(router.urls)),
]


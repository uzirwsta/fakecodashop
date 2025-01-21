from django.urls import path
from . import views

urlpatterns =[
    path('games/', views.getGames, name="games"),
    path('game/<str:pk>', views.getGame, name="game"),
]

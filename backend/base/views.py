from django.shortcuts import render
from django.http import JsonResponse
from base.games import games

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def getGames(request):
        games = None
        return Response(games)

@api_view(['GET'])
def getGame(request, pk):
        games = None
        for i in games:
            if i['_id'] == pk:
                  games = i
                  break 
        return Response(Game)
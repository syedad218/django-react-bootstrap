from django.shortcuts import render
from rest_framework import routers, serializers, viewsets, permissions
from ticketmanagement.serializers import UserSerializer, TicketSerializer, CategorySerializer
from users.models import User
from tickets.models import Ticket, Category

# Create your views here.

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
      permissions.AllowAny
    ]
    serializer_class = UserSerializer

# ViewSets define the view behavior.
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    permission_classes = [
      permissions.AllowAny
    ]
    serializer_class = TicketSerializer


# ViewSets define the view behavior.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
      permissions.AllowAny
    ]
    serializer_class = CategorySerializer
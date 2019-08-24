from django.shortcuts import render
from rest_framework import routers, serializers, viewsets, permissions
from ticketmanagement.serializers import UserSerializer, TicketSerializer, CategorySerializer, CommentSerializer
from users.models import User
from tickets.models import Ticket, Category, Comment

# Create your views here.

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
      permissions.IsAdminUser
    ]
    serializer_class = UserSerializer

# ViewSets define the view behavior.
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
      permissions.IsAuthenticated
    ]
    serializer_class = TicketSerializer
    def get_queryset(self):
      return self.request.user.tickets.all()
    
    def perform_create(self, serializer):
      serializer.save(user=self.request.user) 


# ViewSets define the view behavior.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [
      permissions.AllowAny
    ]
    serializer_class = CategorySerializer
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permission_classes = [
      permissions.AllowAny
    ]
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Comment.objects.all()
        ticket_id = self.request.query_params.get('ticket_id', None)
        if ticket_id is not None:
            queryset = queryset.filter(ticket__id=ticket_id)
        return queryset
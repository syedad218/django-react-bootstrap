from django.shortcuts import render
from rest_framework import routers, serializers, viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ticketmanagement.serializers import UserSerializer, TicketSerializer, CategorySerializer, CommentSerializer
from users.models import User
from tickets.models import Ticket, Category, Comment
import logging

logger = logging.getLogger(__name__)

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
    queryset = Ticket.objects.all()
    permission_classes = [
      permissions.IsAuthenticated
    ]
    serializer_class = TicketSerializer
    def get_queryset(self):
      return self.request.user.tickets.all()
    
    def perform_create(self, serializer):
      serializer.save(user=self.request.user)
      
    def retrieve(self, request, pk=None):
      queryset = Ticket.objects.all()
      ticket = get_object_or_404(queryset, pk=pk)
      comments = ticket.comments.all()
      logger.info(comments)
      if(comments.exists()):
        comments = CommentSerializer(comments, many=True).data
      else:
        comments: []
      serializer = TicketSerializer(ticket)
      return Response({"ticket":serializer.data, "comments": comments})


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
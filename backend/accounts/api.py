from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from users.models import User
from .serializers import RegisterSerializer, LoginSerializer
from ticketmanagement.serializers import UserSerializer

# Resgister API
class RegisterAPI(generics.GenericAPIView):
  queryset = User.objects.all()
  serializer_class = RegisterSerializer
  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  queryset = User.objects.all()
  serializer_class = LoginSerializer
  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })
  

# Get User API
from rest_framework import serializers
from users.models import User
from tickets.models import Ticket, Category, Comment

# Serializers define the API representation.
class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=100, style={"input_type":"password"})
    is_staff = serializers.BooleanField(default=False)

    def create(self, validated_data):
        """The function called when you create a new User object/instance"""

        return User.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        """
        Update and return an existing `User` instance, given the validated data.
        """
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.save()
        return instance

# Serializers define the API representation.
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

# Serializers define the API representation.
class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'slug')
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
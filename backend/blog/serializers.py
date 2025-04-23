from rest_framework import serializers
from .models import Post
from django.contrib.auth.models import User
from .models import Comment
from .models import Draft

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'body', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'body','description', 'author', 'category', 'created_at']

class DraftSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Draft
        fields = ['id', 'title', 'body', 'description', 'category', 'author', 'created_at']


class UserSerializer(serializers.ModelSerializer):

    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'posts', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        print("Inside create method of UserSerializer")

        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        print("Created user:", user.username)
        print("password :", user.password)
        return user

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .models import Comment
from .serializers import PostSerializer, UserSerializer, CommentSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings
from .models import Draft
from .serializers import DraftSerializer



# Fetch specific user details
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user  # Get the currently authenticated user
    serializer = UserSerializer(user)
    return Response(serializer.data)
    

# Fetch a specific post by ID (no authentication required)
@api_view(['GET'])
@permission_classes([AllowAny])
def getPostById(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    serializer = PostSerializer(post)
    return Response(serializer.data)


# Fetch all posts (no authentication needed)
@api_view(['GET'])
@permission_classes([AllowAny])
def fetchPost(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


# Add a new post (authentication required)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPost(request):
    data = request.data
    post = Post.objects.create(
        title=data.get('title'),
        body=data.get('body'),
        description = data.get('description'),
        category=data.get('category') or 'Other',  # Get category from request
        author=request.user
    )
    serializer = PostSerializer(post)
    return Response({
        'message': 'Post created successfully',
        'post': serializer.data,
    }, status=201)



# Update a post (authentication and ownership required)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePost(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    if post.author != request.user:
        return Response({'error': 'You are not authorized to update this post'}, status=403)

    post.title = request.data.get('title', post.title)
    post.body = request.data.get('body', post.body)
    post.description = request.data.get('description', post.description)
    post.category = request.data.get('category', post.category)
    post.save()

    serializer = PostSerializer(post)
    return Response({'message': 'Post updated successfully', 'post': serializer.data}, status=200)


# Delete a post (authentication and ownership required)
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    if post.author != request.user:
        return Response({'error': 'You are not authorized to delete this post'}, status=403)

    post.delete()
    return Response({'message': 'Post deleted successfully'}, status=200)



# User registration
@api_view(['POST'])
@permission_classes([AllowAny])
def registerUser(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'User registered successfully',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=201)
    return Response(serializer.errors, status=400)



# User login
@api_view(['POST'])
@permission_classes([AllowAny])
def loginUser(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=200)
    else:
        return Response({'error': 'Invalid credentials'}, status=401)
    

#function to update the data of user (authentication required)
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    data = request.data

    # Optional fields to update
    username = data.get('username', user.username)
    email = data.get('email', user.email)

    user.username = username
    user.email = email
    user.save()

    serializer = UserSerializer(user)
    return Response({'message': 'User updated successfully', 'user': serializer.data}, status=200)


#add comments
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addComment(request):
    data = request.data
    try:
        post = Post.objects.get(id=data.get('post_id'))
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    comment = Comment.objects.create(
        post=post,
        author=request.user,
        body=data.get('body')
    )
    serializer = CommentSerializer(comment)
    return Response({
        'message': 'Comment added successfully',
        'comment': serializer.data
    }, status=201)


#Fetch comment
@api_view(['GET'])
@permission_classes([AllowAny])
def getCommentsByPost(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    comments = post.comments.all().order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)



#Forget password functionality
@api_view(['POST'])
@permission_classes([AllowAny])
def sendPasswordResetEmail(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist'}, status=404)

    token_generator = PasswordResetTokenGenerator()
    token = token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    reset_link = f"{settings.FRONTEND_URL}/resetPassword/{uid}/{token}/"

    send_mail(
        subject="Reset Your Password",
        message=f"Click the link to reset your password: {reset_link}",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({'message': 'Password reset email sent.'}, status=200)


#Reset Password Functionality
@api_view(['POST'])
@permission_classes([AllowAny])
def resetPassword(request):
    uid = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('password')

    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return Response({'error': 'Invalid UID'}, status=400)

    token_generator = PasswordResetTokenGenerator()
    if not token_generator.check_token(user, token):
        return Response({'error': 'Invalid or expired token'}, status=400)

    print("Before:", user.check_password(new_password))  # check new password with old will it match or not ans is false
    user.set_password(new_password)
    user.save()
    print("After:", user.check_password(new_password))   # check if new password is updated or not the ans is true

    return Response({'message': 'Password reset successful'}, status=200)


# Create a draft
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addDraft(request):
    data = request.data
    draft = Draft.objects.create(
        title=data.get('title'),
        body=data.get('body', ''),
        description=data.get('description', ''),
        category=data.get('category', 'Other'),
        author=request.user
    )
    serializer = DraftSerializer(draft)
    return Response({'message': 'Draft created successfully', 'draft': serializer.data}, status=201)

# Edit a draft
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editDraft(request, draft_id):
    try:
        draft = Draft.objects.get(id=draft_id)
    except Draft.DoesNotExist:
        return Response({'error': 'Draft not found'}, status=404)

    if draft.author != request.user:
        return Response({'error': 'You are not authorized to edit this draft'}, status=403)

    draft.title = request.data.get('title', draft.title)
    draft.body = request.data.get('body', draft.body)
    draft.description = request.data.get('description', draft.description)
    draft.category = request.data.get('category', draft.category)
    draft.save()

    serializer = DraftSerializer(draft)
    return Response({'message': 'Draft updated successfully', 'draft': serializer.data}, status=200)

# Delete a draft
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteDraft(request, draft_id):
    try:
        draft = Draft.objects.get(id=draft_id)
    except Draft.DoesNotExist:
        return Response({'error': 'Draft not found'}, status=404)

    if draft.author != request.user:
        return Response({'error': 'You are not authorized to delete this draft'}, status=403)

    draft.delete()
    return Response({'message': 'Draft deleted successfully'}, status=200)

# Fetch all drafts of a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetchUserDrafts(request):
    drafts = Draft.objects.filter(author=request.user).order_by('-created_at')
    serializer = DraftSerializer(drafts, many=True)
    return Response(serializer.data)


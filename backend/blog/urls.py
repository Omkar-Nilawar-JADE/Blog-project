from django.urls import path
from . import views

urlpatterns = [
    path('fetchPosts/', views.fetchPost),
    path('fetchPosts/<int:post_id>/', views.getPostById),
    path('addPost/', views.addPost),
    path('fetchUser/', views.getUserProfile),
    path('register/', views.registerUser),
    path('login/', views.loginUser),
    path('addComment/', views.addComment),
    path('comments/<int:post_id>/', views.getCommentsByPost),
    path('forgotPassword/', views.sendPasswordResetEmail),
    path('resetPassword/', views.resetPassword),
]


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
    path('deleteComment/<int:comment_id>/',views.deleteComment),
    path('forgotPassword/', views.sendPasswordResetEmail),
    path('resetPassword/', views.resetPassword),
    path('updateUser/', views.updateUser),
    path('updatePost/<int:post_id>/', views.updatePost),
    path('deletePost/<int:post_id>/', views.deletePost),
    path('addDraft/', views.addDraft),
    path('editDraft/<int:draft_id>/', views.editDraft),
    path('deleteDraft/<int:draft_id>/', views.deleteDraft),
    path('fetchDrafts/', views.fetchUserDrafts),
]

from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    description = models.TextField(blank=True, null=True)
    body = models.TextField()
    category = models.CharField(max_length=100, default="Other")  # New field
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title + " | " + str(self.author)

class Comment(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.post.title}'
    
class Draft(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, default='Other')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='drafts')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title + " (Draft)"


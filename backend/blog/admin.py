from django.contrib import admin
from .models import Post
from .models import Comment
from .models import Draft


admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Draft)

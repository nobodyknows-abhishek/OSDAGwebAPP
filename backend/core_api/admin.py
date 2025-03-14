from django.contrib import admin
from .models import Beam, Column, Load

admin.site.register(Beam)
admin.site.register(Column)
admin.site.register(Load)

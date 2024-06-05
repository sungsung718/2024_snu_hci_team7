from django.contrib import admin

from recommender.models import Preference, Movie, Recommendation

# Register your models here.
admin.site.register(Preference)
admin.site.register(Movie)
admin.site.register(Recommendation)
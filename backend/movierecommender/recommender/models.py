from django.db import models
from jsonfield import JSONField
# Create your models here.


class Preference(models.Model):
    genre = JSONField(null=True, blank=True)
    director = models.CharField(max_length=100, null=True, blank=True)
    actor = models.CharField(max_length=100, null=True, blank=True)
    liked = models.CharField(max_length=100, null=True, blank=True)
    hated = models.CharField(max_length=100, null=True, blank=True)
    detail = models.TextField(null=True, blank=True)

    def __str__(self):
        return (
            f"Preference for {self.director or self.actor or self.liked or self.hated}"
        )


class Movie(models.Model):
    title = models.CharField(max_length=100)
    director = models.CharField(max_length=100)
    rating = models.FloatField()
    detail = models.TextField(null=True, blank=True)
    image = models.URLField()
    year = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


class Recommendation(models.Model):
    movies = models.ManyToManyField(Movie, related_name='recommendations')

    def __str__(self):
        return f"Recommendation {self.id}"
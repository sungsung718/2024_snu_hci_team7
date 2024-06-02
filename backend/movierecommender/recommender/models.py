from django.db import models
from jsonfield import JSONField
# Create your models here.


class Preference(models.Model):
    genre = models.CharField(max_length=200, null=False, blank=True)
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
    image = models.URLField(max_length=350)
    year = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


class Recommendation(models.Model):
    # SQLite3가 배열을 저장 못하니 정수,정수,... 꼴로 저장
    movies = models.CharField(max_length=100, null=False, blank=True)
    preference = models.IntegerField()

    def __str__(self):
        return f"Recommendation {self.id}"

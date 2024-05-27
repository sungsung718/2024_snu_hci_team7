from rest_framework import serializers
from .models import Preference, Movie, Recommendation


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['title', 'director', 'rating', 'detail', 'image', 'year']


class RecommendationSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Recommendation
        fields = ['id', 'movies']
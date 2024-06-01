from rest_framework import serializers
from .models import Preference, Movie, Recommendation


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'director', 'rating', 'detail', 'image', 'year']


class RecommendationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'movies': instance.movies
        }

    class Meta:
        model = Recommendation
        fields = ['id', 'movies', 'preference']
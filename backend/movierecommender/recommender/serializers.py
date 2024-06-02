from rest_framework import serializers
from .models import Preference, Movie, Recommendation
from .utils.utils import elems2int, str2arr


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "director", "rating", "detail", "image", "year"]


class RecommendationCreateSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return {"id": instance.id, "movies": instance.movies}

    class Meta:
        model = Recommendation
        fields = ["id", "movies", "preference"]


class RecommendationRetrieveSerializer(serializers.ModelSerializer):
    def get_movies(self):
        return elems2int(str2arr(self.data["movies"]))

    class Meta:
        model = Recommendation
        fields = ["id", "movies", "preference", "likes", "hates"]


class RecommendationUpdateSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return {"id": instance.id, "movies": instance.movies}

    class Meta:
        model = Recommendation
        fields = ["id", "movies", "preference", "likes", "hates", "feedback_detail"]


class FeedbackSerializer(serializers.Serializer):
    recommendation_id = serializers.IntegerField()
    likes = serializers.CharField(allow_blank=True)
    hates = serializers.CharField(allow_blank=True)
    detail = serializers.CharField(allow_blank=True)

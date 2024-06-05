from rest_framework import serializers
from .models import Preference, Movie, Recommendation


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "director", "rating", "detail", "image", "year"]


class RecommendationCreateSerializer(serializers.ModelSerializer):
    def to_internal_value(self, data):
        internal_value = super().to_internal_value(data)
        return {
            **internal_value,
            "likes": "",
            "hates": "",
            "feedback_detail": "",
        }

    def to_representation(self, instance):
        return {"id": instance.id, "movies": instance.movies}

    class Meta:
        model = Recommendation
        fields = ["id", "movies", "preference"]


class RecommendationRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ["id", "movies", "preference", "likes", "hates"]


class RecommendationUpdateSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        return {"id": instance.id, "movies": instance.movies}

    class Meta:
        model = Recommendation
        fields = ["id", "movies", "preference", "likes", "hates", "feedback_detail"]
        extra_kwargs = {"likes": {"allow_blank": True}, "hates": {"allow_blank": True}}


class FeedbackSerializer(serializers.Serializer):
    recommendation_id = serializers.IntegerField()
    likes = serializers.CharField(allow_blank=True)
    hates = serializers.CharField(allow_blank=True)
    detail = serializers.CharField(allow_blank=True)


class FinalRecommendationCreateSerializer(serializers.Serializer):
    recommendations = serializers.CharField(
        max_length=200, allow_null=False, allow_blank=False
    )

from django.urls import path

from recommender.views import RecommendationCreateView

urlpatterns = [
    path("recommendations", RecommendationCreateView.as_view())
]
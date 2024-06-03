from django.urls import path

from recommender.views import (
    RecommendationCreateView,
    RecommendationUpdateView,
    FinalRecommendationCreateView,
    PreviewRetrieveView,
)

urlpatterns = [
    path("recommendations", RecommendationCreateView.as_view()),
    path("recommendations/<int:pk>", RecommendationUpdateView.as_view()),
    path("result", FinalRecommendationCreateView.as_view()),
    path("preview", PreviewRetrieveView.as_view()),
]
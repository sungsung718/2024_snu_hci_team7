from django.urls import path

from recommender.views import RecommendationCreateView, RecommendationUpdateView

urlpatterns = [
    path("recommendations", RecommendationCreateView.as_view()),
    path("recommendations/<int:pk>", RecommendationUpdateView.as_view()),
]
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from recommender.models import Recommendation, Preference, Movie
from recommender.serializers import (
    PreferenceSerializer,
    RecommendationCreateSerializer,
    MovieSerializer,
    FeedbackSerializer,
    RecommendationRetrieveSerializer,
    RecommendationUpdateSerializer,
)
from recommender.utils.constants import RECOMMENDATION_TIMEOUT, RECOMMENDATION_MAX_TRIAL
from recommender.utils.gpt import GPTAgent
from recommender.utils.log import print_log
from recommender.utils.naver import NaverAgent
from recommender.utils.prompt import (
    RecommendationTemplate,
    RevisedRecommendationTemplate,
)
from recommender.utils.utils import movies2arr


# Create your views here.
class RecommendationCreateView(generics.CreateAPIView):
    serializer_class = PreferenceSerializer

    def create(self, request, *args, **kwargs):
        try:
            reply = self.perform_create(request.data)

        except GPTAgent.GPTError:
            print_log(
                f"Error while calling GPT API",
                tag="error",
                place="RecommendationCreateView.post",
            )

            return Response(
                data={"error": "GPT API call failed"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        headers = self.get_success_headers(reply)
        return Response(reply, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, data):
        gpt_agent = GPTAgent()
        gpt_agent.reset_messages()
        prompt = RecommendationTemplate.get_prompt(preference=data)
        gpt_agent.add_message(prompt)

        reply = gpt_agent.get_parsed_answer(
            timeout=RECOMMENDATION_TIMEOUT,
            max_trial=RECOMMENDATION_MAX_TRIAL,
        )

        naver_agent = NaverAgent()
        for movie in reply["movies"]:
            title = movie["title"]
            keyword = f"영화 {title} 포스터"
            url = naver_agent.get_image(keyword=keyword)
            movie["image"] = url

        preference_serializer = self.get_serializer(data=data)
        preference_serializer.is_valid(raise_exception=True)
        preference_serializer.save()

        movie_ids = []
        for movie in reply["movies"]:
            movie_serializer = MovieSerializer(data=movie)
            movie_serializer.is_valid(raise_exception=True)
            movie_serializer.save()
            movie_ids.append(str(movie_serializer.data["id"]))

        preference_id = preference_serializer.data["id"]
        movie_ids_in_str = ",".join(movie_ids)
        recommendation_serializer = RecommendationCreateSerializer(
            data={"movies": movie_ids_in_str, "preference": preference_id}
        )
        recommendation_serializer.is_valid(raise_exception=True)
        recommendation_serializer.save()

        return {**recommendation_serializer.data, **reply}


class RecommendationUpdateView(generics.UpdateAPIView):
    serializer_class = FeedbackSerializer

    def update(self, request, *args, **kwargs):
        data = self.parse_request(request)

        try:
            reply = self.perform_update(data)

        except GPTAgent.GPTError:
            print_log(
                f"Error while calling GPT API",
                tag="error",
                place="RecommendationCreateView.post",
            )

            return Response(
                data={"error": "GPT API call failed"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response(reply, status=status.HTTP_201_CREATED)

    def perform_update(self, data):
        preference_id = data["preference_id"]
        self.parse_data(data)

        gpt_agent = GPTAgent()
        gpt_agent.reset_messages()
        prompt = RevisedRecommendationTemplate.get_prompt(**data)
        gpt_agent.add_message(prompt)

        reply = gpt_agent.get_parsed_answer(
            timeout=RECOMMENDATION_TIMEOUT,
            max_trial=RECOMMENDATION_MAX_TRIAL,
        )

        movie_ids = []
        for movie in reply["movies"]:
            movie_serializer = MovieSerializer(data=movie)
            movie_serializer.is_valid(raise_exception=True)
            movie_serializer.save()
            movie_ids.append(str(movie_serializer.data["id"]))

        movie_ids_in_str = ",".join(movie_ids)
        prev_feedback = data["prev_feedback"]
        cur_feedback = data["cur_feedback"]
        recommendation_serializer = RecommendationUpdateSerializer(
            data={
                "movies": movie_ids_in_str,
                "preference": preference_id,
                "likes": prev_feedback["likes"] + ";" + cur_feedback["likes"],
                "hates": cur_feedback["hates"] + ";" + cur_feedback["hates"],
                "feedback_detail": cur_feedback["detail"]
            }
        )
        recommendation_serializer.is_valid(raise_exception=True)
        recommendation_serializer.save()

        return {**recommendation_serializer.data, **reply}

    def parse_data(self, data):
        preference_serializer = PreferenceSerializer(
            get_object_or_404(Preference, id=data.pop("preference_id"))
        )
        data["preference"] = preference_serializer.data
        data["prev_movies"] = Movie.objects.filter(
            id__in=data.pop("prev_movies_ids")
        ).values_list("title", flat=True)

    def parse_request(self, request):
        feedback_serializer = self.get_serializer(data=request.data)
        feedback_serializer.is_valid(raise_exception=True)
        feedback_data = feedback_serializer.validated_data

        prev_recommendation = get_object_or_404(
            Recommendation, id=feedback_serializer.validated_data["recommendation_id"]
        )
        prev_data = RecommendationRetrieveSerializer(prev_recommendation).data
        data = {
            "preference_id": prev_data["preference"],
            "prev_movies_ids": movies2arr(prev_data["movies"]),
            "prev_feedback": {"likes": prev_data["likes"], "hates": prev_data["hates"]},
            "cur_feedback": {
                "likes": feedback_data["likes"],
                "hates": feedback_data["hates"],
                "detail": feedback_data["detail"]
            },
        }

        return data

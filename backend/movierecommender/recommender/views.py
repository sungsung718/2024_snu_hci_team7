from rest_framework import generics, status
from rest_framework.response import Response

from recommender.serializers import (
    PreferenceSerializer,
    RecommendationSerializer,
    MovieSerializer,
)
from recommender.utils.constants import RECOMMENDATION_TIMEOUT, RECOMMENDATION_MAX_TRIAL
from recommender.utils.gpt import GPTAgent
from recommender.utils.log import print_log
from recommender.utils.naver import NaverAgent
from recommender.utils.prompt import RecommendationTemplate


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
        recommendation_serializer = RecommendationSerializer(
            data={"movies": movie_ids_in_str, "preference": preference_id}
        )
        recommendation_serializer.is_valid(raise_exception=True)
        recommendation_serializer.save()

        return {**recommendation_serializer.data, **reply}

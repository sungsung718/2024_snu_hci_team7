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
    FinalRecommendationCreateSerializer,
)
from recommender.utils.constants import RECOMMENDATION_TIMEOUT, RECOMMENDATION_MAX_TRIAL
from recommender.utils.gpt import GPTAgent
from recommender.utils.log import print_log
from recommender.utils.naver import NaverAgent
from recommender.utils.prompt import (
    RecommendationTemplate,
    RevisedRecommendationTemplate,
)
from recommender.utils.utils import ids2arr


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

        self.get_image(reply)

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

    def get_image(self, reply):
        naver_agent = NaverAgent()
        for movie in reply["movies"]:
            title = movie["title"]
            keyword = f"영화 {title} 포스터"
            url = naver_agent.get_image(keyword=keyword)
            movie["image"] = url


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

        self.get_image(reply)

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
                "likes": self.add_actions(
                    prev_feedback["likes"], cur_feedback["likes"]
                ),
                "hates": self.add_actions(
                    prev_feedback["hates"], cur_feedback["hates"]
                ),
                "feedback_detail": cur_feedback["detail"],
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
            "prev_movies_ids": ids2arr(prev_data["movies"]),
            "prev_feedback": {"likes": prev_data["likes"], "hates": prev_data["hates"]},
            "cur_feedback": {
                "likes": feedback_data["likes"],
                "hates": feedback_data["hates"],
                "detail": feedback_data["detail"],
            },
        }

        return data

    def add_actions(self, old_action, new_action):
        if len(old_action) == 0:
            return new_action
        return old_action + ";" + new_action

    def get_image(self, reply):
        naver_agent = NaverAgent()
        for movie in reply["movies"]:
            title = movie["title"]
            keyword = f"영화 {title} 포스터"
            url = naver_agent.get_image(keyword=keyword)
            movie["image"] = url


class FinalRecommendationCreateView(generics.CreateAPIView):
    serializer_class = FinalRecommendationCreateSerializer

    def create(self, request, *args, **kwargs):
        data = self.parse_request(request)
        try:
            reply = self.perform_create(data)

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

    def perform_create(self, data):
        self.parse_data(data)
        data_for_prompt = {
            "movies": [movie["title"] for movie in data["movies"]]
        }
        reply = self.get_recommendations(data_for_prompt)

        data["movies"].extend(reply["movies"])
        self.add_link(data["movies"])

        return data

    def parse_request(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        data["recommendation_ids"] = ids2arr(data.pop("recommendations"))
        return data

    def parse_data(self, data):
        latest_recommendation_id = sorted(data["recommendation_ids"])[-1]
        field_names = ["feedback_detail", "movies"]
        query_set = Recommendation.objects.filter(id__in=data.pop("recommendation_ids")).values_list(*field_names, flat=True)

        data["history"] = [query[0] for query in query_set]
        data["movie_ids"] = [ids2arr(query[1]) for query in query_set]
        data["movies"] = Movie.objects.filter(
            id__in=data.pop("movie_ids")
        ).values()

    def get_recommendations(self, data):
        gpt_agent = GPTAgent()
        gpt_agent.reset_messages()
        prompt = RevisedRecommendationTemplate.get_prompt(**data)
        gpt_agent.add_message(prompt)

        reply = gpt_agent.get_parsed_answer(
            timeout=RECOMMENDATION_TIMEOUT,
            max_trial=RECOMMENDATION_MAX_TRIAL,
        )

        return reply

    def add_link(self, movies):
        agent = NaverAgent()
        for movie in movies:
            link = agent.get_link("영화 " + movie["title"])
            movie["link"] = link

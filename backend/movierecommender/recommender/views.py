from rest_framework import generics, status
from rest_framework.response import Response

from recommender.serializers import PreferenceSerializer, RecommendationSerializer
from recommender.utils.constants import RECOMMENDATION_TIMEOUT, RECOMMENDATION_MAX_TRIAL
from recommender.utils.gpt import GPTAgent
from recommender.utils.log import print_log
from recommender.utils.prompt import RecommendationTemplate


# Create your views here.
class RecommendationCreateView(generics.CreateAPIView):
    serializer_class = PreferenceSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            reply = self.perform_create(serializer)

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

    def perform_create(self, serializer):
        gpt_agent = GPTAgent()
        # TODO: Fill in appropriate parameters for get_prompt()
        prompt = RecommendationTemplate.get_prompt()
        gpt_agent.add_message(prompt)

        reply = gpt_agent.get_answer(
            timeout=RECOMMENDATION_TIMEOUT,
            max_trial=RECOMMENDATION_MAX_TRIAL,
        )

        # TODO: Fill in appropriate parameters for recommendation_serializer
        recommendation_serializer = RecommendationSerializer(data=reply)
        recommendation_serializer.is_valid(raise_exception=True)

        serializer.save()
        recommendation_serializer.save()

        return recommendation_serializer.data

# 네이버 검색 API 예제 - 블로그 검색
import json
import urllib.request
from typing import Optional

from movierecommender.settings import NAVER_CLIENT_ID, NAVER_API_KEY

client_id = NAVER_CLIENT_ID
client_secret = NAVER_API_KEY


class NaverAgent:
    def get_image(self, keyword):
        encText = urllib.parse.quote(keyword)
        url = "https://openapi.naver.com/v1/search/image?display=5&query=" + encText  # JSON 결과
        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id", client_id)
        request.add_header("X-Naver-Client-Secret", client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        if rescode != 200:
            raise NaverError("Cause: Naver API Call")

        response_body = json.loads(response.read().decode("utf-8"))
        for movie in response_body["items"]:
            if len(movie["thumbnail"]) < 200:
                return movie["thumbnail"]

        return ""


class NaverError(Exception):
    def __init__(self, cause: str, *args, answer: Optional[str] = None):
        self.cause = cause
        self.answer = answer
        super().__init__(*args)

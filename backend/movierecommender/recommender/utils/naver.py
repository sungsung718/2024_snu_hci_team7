import json
import urllib.request
from typing import Optional

from bs4 import BeautifulSoup

from movierecommender.settings import NAVER_CLIENT_ID, NAVER_API_KEY

client_id = NAVER_CLIENT_ID
client_secret = NAVER_API_KEY


def get_image(keyword):
    encText = urllib.parse.quote(keyword)
    official_image = get_official_image(encText)
    if official_image:
        return official_image

    url = (
        "https://openapi.naver.com/v1/search/image?display=5&query=" + encText
    )  # JSON 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()
    if rescode != 200:
        raise NaverError("Cause: Naver API Call")

    response_body = json.loads(response.read().decode("utf-8"))
    for movie in response_body["items"]:
        if len(movie["thumbnail"]) < 350:
            return movie["thumbnail"]

    return ""


def get_official_image(encText):
    url = (
        "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="
        + encText
    )  # JSON 결과
    a = urllib.request.urlopen(url)
    soup = BeautifulSoup(a.read(), "html.parser")
    img_tag = soup.find("img", {"class": "_img"})
    if not img_tag:
        return None
    return img_tag.get("src")


def get_link(keyword):
    encText = urllib.parse.quote(keyword)
    url = (
        "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query="
        + encText
    )  # JSON 결과
    return url


class NaverError(Exception):
    def __init__(self, cause: str, *args, answer: Optional[str] = None):
        self.cause = cause
        self.answer = answer
        super().__init__(*args)

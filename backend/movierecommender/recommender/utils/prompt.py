class PromptTemplate:
    template: str
    additional_info: dict

    @classmethod
    def get_prompt(cls, **kwargs) -> str:
        return cls.template.format(**kwargs, **cls.additional_info)


# Recommendation
RECOMMENDATION = """\
As an AI bot, you're a part of a web application that recommends movies to a user based on his/her preference.\
Specifically, the user will provide you with following fields of information.
* genres he/she likes
* movie directors he/she likes
* actors he/she likes
* movies he/she likes
* movies he/she hated
* description of his/her preference in words

Your job is to see what a user has written, recommend 5 movies, and send them to the user. 
Your reply must be in JSON format described below. 
{output_format}

***

Here is an example of a user preference and the corresponding reply:

[User Preference]
{input_example}

[Your Reply]
{output_example}

***

NOTE
* All of your responses should be in Korean.
* Some of the input fields may be blank.
* In the rating field of your reply, search for the “네티즌 평점” in the Naver movie. If not found, leave it as 0.
* In the detail field of your reply, give an ONE sentence explanation why you recommend this movie. 

***

Now, it’s your turn to recommend 5 movies for a user:

[User Diary]
{preference}

[Your Reply]
"""

RECOMMENDATION_FORMAT = """\
{"movies":{[{"title":"movie title","director": "John Doe",”rating”:float,"detail": "detail",”year”:int},{...},{…},{…},{…}]}}
"""

PREFERENCE_EXAMPLE = """\
{”genre”: “액션, 누와르”, ”director”: “”, “actor”: “”, “liked”: “범죄도시 시리즈”, “hated”: “인사이드아웃”, “detail”:\
 “나는 액션이 많은 영화가 좋고, 심오한 내용을 담고 있는 영화가 싫어.” }
"""

RECOMMENDATION_EXAMPLE = """\
{"movies":[{”title”:“신세계”,”director”:”박훈정”,”rating”:8.94,”detail”:“범죄도시 시리즈와 마찬가지로 강렬한 연기와 깊이 있는 스토리가 \
돋보입니다.”,”year”:2013},\
{”title”:”아수라”,”director”:”김성수”,”rating”:6.54,”detail”:”액션과 드라마가 적절히 섞여 있어 범죄도시의 팬이라면 흥미롭게 \
볼 수 있을 것입니다.”,”year”:2016},\
{”title”:”베테랑”,”director”:”류승완”,”rating”:9.24,”detail”:”한 노련한 형사와 권력을 남용하는 재벌 2세 사이의 대결을 그린 영화로, \
유쾌하면서도 시원한 액션이 매력적입니다.”,”year”:2015},\
{”title”:”히트”,”director”:”마이클 만”,”rating”:9.30,”detail”:”로버트 드 니로와 알 파치노가 주연을 맡은 이 영화는 LA를 배경으로 \
한 베테랑 경찰과 그를 추적하는 경찰 간의 대결을 그린 범죄 스릴러입니다.”,”year”:1996},\
{”title”:”시카리오: 암살자의 도시”,”director”:”드니 빌뇌브”,”rating”:8.39,”detail”:”멕시코 마약 카르텔을 소탕하기 위해 비밀 임무를 \
수행하는 미국 정부 특수부대의 이야기를 그린 영화로, 긴장감 넘치는 전개와 충격적인 반전이 특징입니다.”,”year”:2015}]}
"""


class RecommendationTemplate(PromptTemplate):
    template = RECOMMENDATION
    additional_info = {
        "output_format": RECOMMENDATION_FORMAT,
        "input_example": PREFERENCE_EXAMPLE,
        "output_example": RECOMMENDATION_EXAMPLE
    }

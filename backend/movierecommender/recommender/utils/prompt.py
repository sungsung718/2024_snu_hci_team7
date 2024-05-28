class PromptTemplate:
    template: str

    @classmethod
    def get_prompt(cls, **kwargs) -> str:
        return cls.template.format(**kwargs)


# TODO: Fill in the appropriate prompt for the recommendation
RECOMMENDATION = """\
    
"""


class RecommendationTemplate(PromptTemplate):
    template = RECOMMENDATION

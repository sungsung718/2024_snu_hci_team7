import { Preference } from "@/customTypes";

export const getMockPreviewMovies = async () => {
  return {
    recent_movies: [1, 2, 3, 4, 5].map((i) => ({
      title: "액션" + i,
      image:
        "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
      year: 1984,
      hashtags: "#통쾌한#대표 한국 범죄 영화#대중이 원하는 오락",
    })),
    classic_movies: [6, 7, 8, 9, 10].map((i) => ({
      title: "액션" + i,
      image:
        "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
      year: 1984,
      hashtags: "#통쾌한#대표 한국 범죄 영화#대중이 원하는 오락",
    })),
  };
};

export const postMockRecommendations = async (preference: Preference) => {
  return {
    id: 1,
    movies: [1, 2, 3, 4, 5].map((i) => ({
      id: i,
      title: "Movie Title",
      director: "John Doe",
      rating: 8.5,
      detail:
        "이 영화는/ 심리적인 내용과 /예술적 표현을 통해 /당신의 호기심을 자극할 것입니다.",
      image:
        "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
      year: 2022,
    })),
  };
};

type PreferenceModified = {
  recommendation_id: number;
  likes: string;
  hates: string;
  detail: string;
};

export const putMockRecommendations = async (
  preference: PreferenceModified
) => {
  return {
    id: 1,
    movies: [1, 2, 3, 4, 5].map((i) => ({
      id: i,
      title: "Movie Title",
      director: "John Doe",
      rating: 8.5,
      detail:
        "이 영화는/ 심리적인 내용과 /예술적 표현을 통해 /당신의 호기심을 자극할 것입니다.",
      image:
        "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
      year: 2022,
      link: "https://search.naver.com/영화",
    })),
  };
};

export const postMockResult = async (recommendationIds: string) => {
  return {
    history: [
      "나는 코미디 영화를 좋아하고 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
      "조금 더 한국 영화 위주로 ...",
    ],
    movies: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
      id: i,
      title: "Movie Title",
      director: "John Doe",
      rating: 8.5,
      detail:
        "이 영화는/ 심리적인 내용과 /예술적 표현을 통해 /당신의 호기심을 자극할 것입니다.",
      image: "src/assets/darkknight.jpg",
      year: 2022,
      link: "https://search.naver.com/영화",
    })),
  };
};

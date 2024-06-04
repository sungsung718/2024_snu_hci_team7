import { Movie, Preference } from "@/customTypes";

const BASE_URL = "http://localhost:8000/api";

const getRequest = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`);
  return await response.json();
};

const postRequest = async <T = unknown>(
  url: string,
  body: object
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST", //default는 GET이기 때문에 POST로 따로 설정해줘야함
    body: JSON.stringify(body), //array, list -> JSON format
  });
  return await response.json();
};

const putRequest = async <T = unknown>(
  url: string,
  body: object
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    body: JSON.stringify(body), //array, list -> JSON format
  });
  return await response.json();
};

export const getPreviewMovies = async () => {
  return {
    recent_movies: [1, 2, 3, 4, 5].map((i) => ({
      title: "액션" + i,
      image:
        "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
      year: 1984,
      hashtags: "#통쾌한#대표 한국 범죄 영화#대중이 원하는 오락",
    })),
    classic_movies: [1, 2, 3, 4, 5].map((i) => ({
      title: "액션" + i,
      image:
        "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
      year: 1984,
      hashtags: "#통쾌한#대표 한국 범죄 영화#대중이 원하는 오락",
    })),
  };

  return await getRequest<{
    recent_movies: Movie[];
    classic_movies: Movie[];
  }>("/preview");
};

export const postRecommendations = async (preference: Preference) => {
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

  return await postRequest<{ id: number; movies: Movie[] }>(
    "/recommendations",
    preference
  );
};

type PreferenceModified = {
  recommendation_id: number;
  likes: string;
  hates: string;
  detail: string;
};

export const putRecommendations = async (preference: PreferenceModified) => {
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

  return await putRequest<{ id: number; movies: Movie[] }>(
    `/recommendations/${preference.recommendation_id}`,
    preference
  );
};

export const postResult = async (recommendationIds: string) => {
  return {
    history: [
      "나는 코미디 영화를 좋아하고 ...",
      "조금 더 한국 영화 위주로 ...",
    ],
    movies: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
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

  return await postRequest<{ history: string[]; movies: Movie[] }>(`/result`, {
    recommendations: recommendationIds,
  });
};

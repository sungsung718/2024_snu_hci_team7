import { Movie, Preference } from "@/customTypes";

const BASE_URL = "http://localhost:8080/api";

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

const patchRequest = async <T = unknown>(
  url: string,
  body: object
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "PATCH",
    body: JSON.stringify(body), //array, list -> JSON format
  });
  return await response.json();
};

export const getPreviewMovies = async () => {
  return {
    latest: [
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
    ],
    classic: [
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
    ],
  };
  return await getRequest<{
    latest: Movie[];
    classic: Movie[];
  }>("/preview");
};

export const postRecommendations = async (preference: Preference) => {
  return {
    id: 1,
    movies: [
      {
        id: 1,
        title: "Movie Title",
        director: "John Doe",
        rating: 8.5,
        detail:
          "이 영화는 심리적인 내용과 예술적 표현을 통해 당신의 호기심을 자극할 것입니다.",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John Doe",
        rating: 8.5,
        detail:
          "이 영화는 심리적인 내용과 예술적 표현을 통해 당신의 호기심을 자극할 것입니다.",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John Doe",
        rating: 8.5,
        detail:
          "이 영화는 심리적인 내용과 예술적 표현을 통해 당신의 호기심을 자극할 것입니다.",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John Doe",
        rating: 8.5,
        detail:
          "이 영화는 심리적인 내용과 예술적 표현을 통해 당신의 호기심을 자극할 것입니다.",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John Doe",
        rating: 8.5,
        detail:
          "이 영화는 심리적인 내용과 예술적 표현을 통해 당신의 호기심을 자극할 것입니다.",
        image:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 2022,
      },
    ],
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

export const patchRecommendations = async (
  id: number,
  preference: PreferenceModified
) => {
  return {
    id: 1,
    movies: [
      {
        id: 1,
        title: "Movie Title",
        director: "John ",
        rating: 8.5,
        detail: "...",
        image: "https://www.google.com/search?...",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John ",
        rating: 8.5,
        detail: "...",
        image: "https://www.google.com/search?...",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John ",
        rating: 8.5,
        detail: "...",
        image: "https://www.google.com/search?...",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John ",
        rating: 8.5,
        detail: "...",
        image: "https://www.google.com/search?...",
        year: 2022,
      },
      {
        id: 1,
        title: "Movie Title",
        director: "John ",
        rating: 8.5,
        detail: "...",
        image: "https://www.google.com/search?...",
        year: 2022,
      },
    ],
  };

  return await patchRequest<{ id: number; movies: Movie[] }>(
    `/recommendations/${id}`,
    preference
  );
};

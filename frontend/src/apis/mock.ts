import { Preference } from "@/customTypes";

export const getMockPreviewMovies = async () => {
  return {
    recent_movies: [
      {
        title: "파묘",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240222_175%2F1708609058134r4oaq_JPEG%2Fmovie_image.jpg",
        year: 2024,
        hashtags: "#미스터리#공포#항일",
      },
      {
        title: "범죄도시4",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240425_256%2F17140073560223JK9r_JPEG%2Fmovie_image.jpg",
        year: 2024,
        hashtags: "#액션#범죄#통쾌한#마동석",
      },
      {
        title: "인사이드 아웃2",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20240612_151%2F1718180074487NH0V5_JPEG%2Fmovie_image.jpg",
        year: 2024,
        hashtags: "#애니메이션#디즈니#픽사#감정",
      },
      {
        title: "서울의 봄",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20231108_128%2F1699411327204OxmAK_JPEG%2Fmovie_image.jpg",
        year: 2023,
        hashtags: "#12.12 군사반란#대한민국#황정민",
      },
      {
        title: "가디언즈 오브 갤럭시 3",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20230503_20%2F1683109578216k8TUH_JPEG%2Fmovie_image.jpg",
        year: 2023,
        hashtags: "#마블#히어로#액션",
      },
    ],

    classic_movies: [
      {
        title: "레옹",
        image:
          "https://i.namu.wiki/i/RNfq3qBXGmp927dimjIbiLwoaBMlpQKIFkmIsUqIAVhFeE7kX2XJoz00Gd6ndDcRi-RLxa4gD_lWDFwgUeUyq_LWtbllB6tp816_l4ELJIzHZZ1nigxn1AUH72aBdNgqDIhMrQCl8mECCE1NSsxyRw.webp",
        year: 1994,
        hashtags: "#레옹#마틸다#감동적#킬러#복수#뤽 베송#나탈리 포트만",
      },
      {
        title: "타이타닉",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20111222_12%2F1324529162873pqyNT_JPEG%2Fmovie_image.jpg",
        year: 1998,
        hashtags: "#로맨스#비극#레오나르도 디카프리오",
      },
      {
        title: "센과 치히로의 행방불명",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20111222_193%2F1324523432635Av67a_JPEG%2Fmovie_image.jpg",
        year: 2002,
        hashtags: "#스튜디오 지브리#미야자키 하야오",
      },
      {
        title: "다크 나이트",
        image:
          "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20200622_64%2F15927889581932gf40_JPEG%2Fmovie_image.jpg",
        year: 2008,
        hashtags: "#DC#배트맨#조커#크리스토퍼 놀란#정의#철학적 메시지",
      },
      {
        title: "아바타",
        image:
          "https://i.namu.wiki/i/DlxJcATplPzdAtEzrXJj1pM5uLbwSAbIpwKxrezOUyySFrzy2-ZRxDmWnKlTEKjre6k83jnx_HdEJVTxphoRPE01AULjKtcwlaj_Yrpk_KdxRRxGE2DMubSdiuyAS0iC628XHBT6sN7bdV18OXyVUA.webp",
        year: 2009,
        hashtags:
          "#SF#블록버스터#독보적인 영상미#3D#제임스 카메론#박스오피스 1위",
      },
    ],
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

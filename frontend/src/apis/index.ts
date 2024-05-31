const BASE_URL = "http://localhost:8080/api";

const getRequest = async <T = unknown>(url: string): Promise<T> => {
  const finalUrl = BASE_URL + url;
  const response = await fetch(finalUrl);
  return await response.json();
};

export const getPreviewMovies = async () => {
  return {
    latest: [
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
    ],
    classic: [
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
      {
        title: "액션",
        imageUrl:
          "https://i.namu.wiki/i/kCl6N7uOwDN3EAzl7hRjouXiOPWajThFWy6V7BJ1s0W00k-LtKIXunQTIpd2npiN1hsPGr-XYWnE-uca4DiWnQ.webp",
        year: 1984,
        keywords: ["#통쾌한", "#대표 한국 범죄 영화", "#대중이 원하는 오락"],
      },
    ],
  };
  //   return await getRequest("/preview");
};

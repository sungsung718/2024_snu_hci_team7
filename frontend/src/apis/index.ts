import { Movie, Preference } from "@/customTypes";
import {
  getMockPreviewMovies,
  postMockRecommendations,
  postMockResult,
  putMockRecommendations,
} from "./mock";

const BASE_URL = "http://localhost:8000/api";

const getRequest = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    credentials: "include",
  });
  return await response.json();
};

const postRequest = async <T = unknown>(
  url: string,
  body: object
): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "POST", //default는 GET이기 때문에 POST로 따로 설정해줘야함
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body), //array, list -> JSON format
  });
  return await response.json();
};

export const getPreviewMovies =
  //  getMockPreviewMovies;
  async () =>
    await getRequest<{
      recent_movies: Movie[];
      classic_movies: Movie[];
    }>("/preview");

export const postRecommendations =
  // postMockRecommendations;
  async (preference: Preference) =>
    await postRequest<{ id: number; movies: Movie[] }>(
      "/recommendations",
      preference
    );

type PreferenceModified = {
  recommendation_id: number;
  likes: string;
  hates: string;
  detail: string;
};

export const putRecommendations =
  // putMockRecommendations;
  async (preference: PreferenceModified) =>
    await putRequest<{ id: number; movies: Movie[] }>(
      `/recommendations/${preference.recommendation_id}`,
      preference
    );

export const postResult =
  // postMockResult;
  async (recommendationIds: string) =>
    await postRequest<{ history: string[]; movies: Movie[] }>(`/result`, {
      recommendations: recommendationIds,
    });

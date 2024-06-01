export type Movie = {
  title: string;
  image: string;
  year?: number;
  director?: string;
  rating?: number;
  keywords?: string[];
  detail?: string;
};

export type Preference = {
  genre: string;
  director: string;
  actor: string;
  liked: string;
  hated: string;
  detail: string;
};

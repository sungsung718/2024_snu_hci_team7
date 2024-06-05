export type Movie = {
  title: string;
  image: string;
  year?: number;
  hashtags?: string;
  director?: string;
  rating?: number;
  keywords?: string[];
  detail?: string;
  link?: string;
};

export type Preference = {
  genre: string;
  director: string;
  actor: string;
  liked: string;
  hated: string;
  detail: string;
};

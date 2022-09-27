import { json } from "stream/consumers";

const apiKey = process.env.REACT_APP_API_KEY;

export const getMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const getMovieById = (id: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

export const rateMovie = (
  movieId: number | undefined,
  rating: number,
  sessionId: string
) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        value: rating,
      }),
    }
  ).then((res) => res.json());
};

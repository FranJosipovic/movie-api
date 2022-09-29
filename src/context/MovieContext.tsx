import React, { createContext, ReactNode, useContext, useState } from "react";
import { getMovieById, getMovieReviews, rateMovie } from "../apis/movie";
import { getRatedMovies } from "../apis/user";

type Session = {
  sesionExpiresAt: string;
  sessionId: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type Genre = {
  id: number;
  name: string;
};

type Collection = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

type MovieProps = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieProviderProps = {
  children: ReactNode;
};

type MovieContext = {
  movie: MovieProps | null;
  loadMovie: (
    id: number,
    setStars: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  myRating: number;
  handleRateMovie: (rating: number) => void;
};

const MovieContext = createContext({} as MovieContext);

export function useMovie() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }: MovieProviderProps) {
  const session: Session = JSON.parse(localStorage.getItem("session")!);

  const [movie, setMovie] = useState<MovieProps | null>(null);

  const [myRating, setMyRating] = useState<number>(0);

  function handleRateMovie(rating: number) {
    if (!session) {
      return;
    }
    rateMovie(movie?.id, rating, session?.sessionId).then((data) => {
      if (data.success) {
        setMyRating(rating);
      }
    });
  }

  function loadMovie(
    id: number,
    setStars: React.Dispatch<React.SetStateAction<number>>
  ) {
    getMovieById(id).then((movie) => {
      getRatedMovies(session?.sessionId).then((data) => {
        let ratedMovie = data.results.find((r: any) => {
          return r.id === Number(id);
        });
        if (ratedMovie) {
          setMyRating(ratedMovie.rating);
          setStars(ratedMovie.rating);
        }
      });
      getMovieReviews(id).then((data) => {
        console.log(data);
      });
      setMovie(movie);
    });
  }
  return (
    <MovieContext.Provider
      value={{ movie, loadMovie, myRating, handleRateMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
}

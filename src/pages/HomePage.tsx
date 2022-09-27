import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getMovies } from "../apis/movie";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import { data, data as starterData } from "../data";
import { BsShuffle } from "react-icons/bs";

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type FetchResult = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export default function HomePage() {
  const [page, setPage] = useState<number>(2);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/configuration?api_key=f7622ff39a4206d941a6a4e87268320d",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  useEffect(() => {
    getMovies(page).then((data) => {
      setMovies((prevData: Movie[]) => {
        return [...prevData, ...data.results];
      });
    });
  }, [page]);

  return (
    <div
      className=" dark-primary"
      style={{ overflowX: "hidden", textAlign: "center", position: "relative" }}
    >
      <Navbar />
      <Container style={{ marginTop: "85px" }}>
        <div
          className="d-flex flex-wrap w-100 mx-auto"
          style={{
            gap: "14px",
            justifyContent: "stretch",
          }}
        >
          {movies &&
            movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  rating={movie.vote_average}
                  language={movie.original_language}
                  title={movie.original_title}
                  releaseDate={movie.release_date}
                  poster={movie.poster_path}
                  id={movie.id}
                />
              );
            })}
        </div>
      </Container>
      <button
        className="load-btn"
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Load more
      </button>
      <div className="shuffle-btn ">
        <BsShuffle size="50%" />
      </div>
    </div>
  );
}

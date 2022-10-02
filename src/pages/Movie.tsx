import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, rateMovie } from "../apis/movie";
import { Container } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { getRatedMovies } from "../apis/user";
import { useMovie } from "../context/MovieContext";

const RATING = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Movie() {
  const { loadMovie, movie, handleRateMovie, myRating } = useMovie();

  const [stars, setStars] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    loadMovie(Number(id), setStars);
  }, []);

  return (
    <>
      {movie && (
        <div
          className="dark-primary"
          style={{ width: "100vw", minHeight: "100vh" }}
        >
          <Container className="text-white pt-2">
            <div className="">
              {movie.title} ( {movie.release_date.slice(0, 4)} )
            </div>
            <div
              className="poster-img mt-2"
              style={{
                width: "100%",
              }}
            >
              <div
                className="w-100"
                style={{
                  position: "relative",
                  height: "75vh",
                }}
              >
                <img
                  src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt=""
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="w-100 movie-overview"
                  style={{
                    overflow: "auto",
                    maxHeight: "40%",
                    padding: "2px",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    color: "#E94560",
                    background: "rgba(0,0,0,0.5)",
                    borderTopRightRadius: "4px",
                  }}
                >
                  {movie.overview}
                </div>
              </div>
            </div>
            <div
              className="rating d-flex mt-2"
              style={{ justifyContent: "space-between" }}
            >
              <div className="global-ratings">Rating: {movie.vote_average}</div>
              <div className="my-rating" style={{ cursor: "pointer" }}>
                {RATING.map((r) => {
                  if (r <= stars) {
                    return (
                      <AiFillStar
                        key={r}
                        size={"25px"}
                        onMouseEnter={() => setStars(r)}
                        onMouseLeave={() => setStars(myRating)}
                        onClick={() => handleRateMovie(r)}
                        color="yellow"
                      />
                    );
                  }
                  return (
                    <AiOutlineStar
                      key={r}
                      size={"25px"}
                      color="yellow"
                      onMouseEnter={() => setStars(r)}
                      onMouseLeave={() => setStars(myRating)}
                      onClick={() => handleRateMovie(r)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mt-2">Popularity: {movie.popularity}</div>
            <div className="mt-2">Language: {movie.original_language}</div>
            <div className="mt-2">
              Genres:{" "}
              {movie.genres.map((genre, i) => {
                return (
                  <span key={i}>
                    {genre.name}
                    {movie.genres.length !== i + 1 && ", "}
                  </span>
                );
              })}
            </div>
            <div></div>
          </Container>
        </div>
      )}
    </>
  );
}

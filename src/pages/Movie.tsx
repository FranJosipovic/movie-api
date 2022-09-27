import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, rateMovie } from "../apis/movie";
import { Container } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { getRatedMovies } from "../apis/user";

const RATING = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

type Movie = {
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

export default function Movie() {
  const { id } = useParams();

  const session: Session = JSON.parse(localStorage.getItem("session")!);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [myRating, setMyRating] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);

  function hadleRateMovie(rating: number) {
    if (!session) {
      return;
    }
    rateMovie(movie?.id, rating, session?.sessionId).then((data) => {
      if (data.success) {
        setMyRating(rating);
      }
    });
  }

  useEffect(() => {
    getMovieById(Number(id)).then((movie) => {
      getRatedMovies(session?.sessionId).then((data) => {
        let ratedMovie = data.results.find((r: any) => {
          return r.id === id;
        });
        if (ratedMovie) {
          setMyRating(ratedMovie.rating);
          setStars(ratedMovie.rating);
        }
      });
      setMovie(movie);
    });
  }, []);

  return (
    <>
      {movie && (
        <div
          className="dark-primary"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Container className="text-white pt-2">
            <div className="">
              {movie.title} ( {movie.release_date.slice(0, 4)} )
            </div>
            <div className="poster-img mt-2" style={{ position: "relative" }}>
              <img
                src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                alt=""
                className="w-100"
              />
              <div
                className="w-75"
                style={{
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
                        onClick={() => hadleRateMovie(r)}
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
                      onClick={() => hadleRateMovie(r)}
                    />
                  );
                })}
              </div>
            </div>
            <div>Popularity: {movie.popularity}</div>
          </Container>
        </div>
      )}
    </>
  );
}

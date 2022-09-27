import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  rating: number;
  language: string;
  title: string;
  releaseDate: string;
  poster: string;
  id: number;
};

export default function MovieCard({
  rating,
  language,
  title,
  releaseDate,
  poster,
  id,
}: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/movie/${id}`);
      }}
      className="card rounded dark-third p-2 text-white"
      style={{ position: "relative", backgroundColor: "#0F3460" }}
    >
      <div className="dark-third" style={{ width: "185px", textAlign: "left" }}>
        <img
          src={`https://image.tmdb.org/t/p/w185${poster}`}
          alt={poster}
          className="w-100 rounded"
        />
        <div className="mt-2">
          {title} ( {releaseDate.slice(0, 4)} )
        </div>
        <div className="mt-2">language: {language}</div>
      </div>
      <div
        className="dark-off rounded-circle d-flex align-items-center justify-content-center"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          translate: "40% -40%",
          width: "30px",
          height: "30px",
        }}
      >
        {rating}
      </div>
    </div>
  );
}

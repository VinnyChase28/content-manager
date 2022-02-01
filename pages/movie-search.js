import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MovieSearchView = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  let tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        tmdbApiKey +
        "&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    console.log(data?.results);

    const moviePosters = data?.results.map((movie) => {
      return (
        <img
          key={movie.poster_path}
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        />
      );
    });

    return (
      <div>
        <p>{moviePosters}</p>
      </div>
    );
  }
};

export default MovieSearchView;

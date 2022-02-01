import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "../components/Card/Card";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px 300px 300px 300px;
  grid-template-rows: 500px 500px 500px 500px;
  grid-gap: 20px;
  margin-left: 200px;
`;

const MovieSearchView = (props) => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //grab popular movie data
  let tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
        tmdbApiKey +
        "&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((movieData) => {
        setMovieData(movieData);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    console.log("movies awww yeaaah", movieData?.results);

    //render popular movie data\

    const moviesPopular = movieData?.results.map((item) => (
      <Card key={item.id} item={item} />
    ));

    return <Grid>{moviesPopular}</Grid>;
  }
};

export default MovieSearchView;

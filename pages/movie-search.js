import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "../components/Card/Card";
import ScrollContainer from "react-indiana-drag-scroll";
import SectionHeader from "../components/SectionHeader/SectionHeader";

const Container = styled.div`
  display: flex;
  margin-bottom: 50px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;

//put all movie API URLs in an array

const urls = {
  popular:
    "https://api.themoviedb.org/3/movie/popular?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
  topRated:
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
  upcoming:
    "https://api.themoviedb.org/3/movie/top_rated?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
};

const MovieSearchView = (props) => {
  const [movieData, setMovieData] = useState(null);
  const [results, setResults] = useState({});
  const [isLoading, setLoading] = useState(true);

  //grab popular movie data
  let tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
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

    //render popular movie data

    return (
      <div>
        <SectionHeader label="Popular ->" />
        <ScrollContainer>
          <Container>
            {movieData?.results.map((item) => (
              <Card key={item.id} item={item} style="display:inline-block;" />
            ))}
          </Container>
        </ScrollContainer>
      </div>
    );
  }
};

export default MovieSearchView;

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

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

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
    "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
};

const MovieSearchView = (props) => {
  // const [movieData, setMovieData] = useState(null);
  const [results, setResults] = useState({
    popular: [],
    upcoming: [],
    topRated: [],
  });
  const [isLoading, setLoading] = useState(true);

  //grab popular movie data

  const fetchApis = async () => {
    try {
      const responses = await Promise.all(
        Object.entries(urls).map(async ([key, url]) => {
          const res = await fetch(url);
          return [key, (await res.json()).results];
        })
      );
      console.log("Movies aww yeah!", Object.fromEntries(responses));
      return Object.fromEntries(responses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchApis().then(setResults);
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <SectionHeader label="Upcoming ->" />
        <ScrollContainer>
          <Container>
            {results?.upcoming.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
        <SectionHeader label="Popular ->" />
        <ScrollContainer>
          <Container>
            {results?.popular.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
        <SectionHeader label="Top Rated ->" />
        <ScrollContainer>
          <Container>
            {results?.topRated.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
      </div>
    );
  }
};

export default MovieSearchView;

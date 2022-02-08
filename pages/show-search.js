import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardShows } from "../components/Card/CardShows";
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

let tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const urls = {
  popular:
    "https://api.themoviedb.org/3/tv/popular?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
  topRated:
    "https://api.themoviedb.org/3/tv/top_rated?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
  airing_today:
    "https://api.themoviedb.org/3/tv/airing_today?api_key=" +
    tmdbApiKey +
    "&language=en-US&page=1",
};

const ShowSearchView = (props) => {
  // const [movieData, setMovieData] = useState(null);
  const [results, setResults] = useState({
    popular: [],
    airing_today: [],
    topRated: [],
  });
  const [isLoading, setLoading] = useState(true);

  //grab popular movie data

  const fetchApis = async () => {
    try {
      setLoading(true);
      const responses = await Promise.all(
        Object.entries(urls).map(async ([key, url]) => {
          const res = await fetch(url);
          return [key, (await res.json()).results];
        })
      );
      console.log("Show aww yeah!", Object.fromEntries(responses));
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
        <SectionHeader label="Popular ->" />
        <ScrollContainer>
          <Container>
            {results?.popular.map((item) => (
              <CardShows key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
        <SectionHeader label="Airing Today ->" />
        <ScrollContainer>
          <Container>
            {results?.airing_today.map((item) => (
              <CardShows key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
        <SectionHeader label="Top Rated ->" />
        <ScrollContainer>
          <Container>
            {results?.topRated.map((item) => (
              <CardShows key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
      </div>
    );
  }
};

export default ShowSearchView;

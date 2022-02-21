import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "../components/Card/Card";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  SectionHeaderPopular,
  SectionHeaderRated,
  SectionHeaderUpcoming,
  SectionHeaderToday,
} from "../components/SectionHeader/SectionHeader";
import FadeIn from "../components/animations/FadeIn";
import { MoviePlay, Tv, Game } from "styled-icons/boxicons-regular";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

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

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

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
  //test

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

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
        <FadeIn duration="1s">
          <SectionHeaderUpcoming label="Upcoming" />
          <ScrollContainer>
            <Container>
              {results?.upcoming.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </Container>
          </ScrollContainer>
          <SectionHeaderPopular label="Popular" />
          <ScrollContainer>
            <Container>
              {results?.popular.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </Container>
          </ScrollContainer>
          <SectionHeaderRated label="Top Rated" />
          <ScrollContainer>
            <Container>
              {results?.topRated.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </Container>
          </ScrollContainer>
        </FadeIn>
      </div>
    );
  }
};

export default MovieSearchView;

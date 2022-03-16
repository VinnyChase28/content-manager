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

import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";
import { CardContainer } from "../components/Scale/Scale";

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
          <ScrollContainer horizontal="true">
            <CardContainer>
              {results?.upcoming.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <SectionHeaderPopular label="Popular" />
          <ScrollContainer>
            <CardContainer>
              {results?.popular.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <SectionHeaderRated label="Top Rated" />
          <ScrollContainer>
            <CardContainer>
              {results?.topRated.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
        </FadeIn>
      </div>
    );
  }
};

export default MovieSearchView;

MovieSearchView.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

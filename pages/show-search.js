import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import FadeIn from "../components/animations/FadeIn";
import { CardShows } from "../components/Card/CardShows";
import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";
import { CardContainer } from "../components/Scale/Scale";
import {
  SectionHeaderPopular,
  SectionHeaderRated, SectionHeaderToday
} from "../components/SectionHeader/SectionHeader";


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
        <FadeIn duration="1s">
          <SectionHeaderToday label="Airing Today" />
          <ScrollContainer>
            <CardContainer>
              {results?.airing_today.map((item) => (
                <CardShows key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <SectionHeaderPopular label="Popular" />
          <ScrollContainer>
            <CardContainer>
              {results?.popular.map((item) => (
                <CardShows key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <SectionHeaderRated label="Top Rated" />
          <ScrollContainer>
            <CardContainer>
              {results?.topRated.map((item) => (
                <CardShows key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
        </FadeIn>
      </div>
    );
  }
};

export default ShowSearchView;

ShowSearchView.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

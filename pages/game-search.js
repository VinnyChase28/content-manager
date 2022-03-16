import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import FadeIn from "../components/animations/FadeIn";
import { CardGames } from "../components/Card/CardGames";
import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";
import { CardContainer } from "../components/Scale/Scale";
import {
  SectionHeaderRated,
  SectionHeaderUpcoming
} from "../components/SectionHeader/SectionHeader";


const GameSearchView = (props) => {
  const [popularResults, setPopularData] = useState([]);
  const [topRatedResults, setTopRatedResults] = useState([]);
  const [upcomingResults, setUpcomingResults] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const urls = [
    "api/games-popular-fetch",
    "api/games-rated-fetch",
    "api/games-upcoming-fetch",
  ];

  const getData = async () => {
    const [result1, result2, result3] = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    setLoading(false);
    setPopularData(result1);
    setTopRatedResults(result2);
    setUpcomingResults(result3);
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  console.log(popularResults, topRatedResults, upcomingResults);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <FadeIn duration="2s">
          <SectionHeaderUpcoming label="Upcoming" />
          <ScrollContainer>
            <CardContainer>
              {upcomingResults.map((item) => (
                <CardGames key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          {/* <SectionHeader label="Popular ->" />
        <ScrollContainer>
          <Container>
            {popularResults?.map((item) => (
              <CardGames key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer> */}
          <SectionHeaderRated label="Top Rated" />
          <ScrollContainer>
            <CardContainer>
              {topRatedResults.map((item) => (
                <CardGames key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
        </FadeIn>
      </div>
    );
  }
};

export default GameSearchView;

GameSearchView.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

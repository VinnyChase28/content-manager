import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardGames } from "../components/Card/CardGames";
import ScrollContainer from "react-indiana-drag-scroll";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import FadeIn from "../components/animations/FadeIn";

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
          <SectionHeader label="Upcoming ->" />
          <ScrollContainer>
            <Container>
              {upcomingResults.map((item) => (
                <CardGames key={item.id} item={item} />
              ))}
            </Container>
          </ScrollContainer>
          {/* <SectionHeader label="Popular ->" />
        <ScrollContainer>
          <Container>
            {popularResults?.map((item) => (
              <CardGames key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer> */}
          <SectionHeader label="Top Rated ->" />
          <ScrollContainer>
            <Container>
              {topRatedResults.map((item) => (
                <CardGames key={item.id} item={item} />
              ))}
            </Container>
          </ScrollContainer>
        </FadeIn>
      </div>
    );
  }
};

export default GameSearchView;

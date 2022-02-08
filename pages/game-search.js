import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardGames } from "../components/Card/CardGames";
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

const GameSearchView = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //todo !!!!!!!!!! apply same logic as movie-search to multiple urls of my own api

  useEffect(() => {
    setLoading(true);
    fetch("api/games-rated-fetch")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  console.log("high Rated Games awww yeahhh", data);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <SectionHeader label="Popular ->" />
        <ScrollContainer>
          <Container>
            {data?.map((item) => (
              <CardGames key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
        {/* <SectionHeader label="Upcoming ->" />
        <ScrollContainer>
          <Container>
            {data?.upcoming.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer>
        <SectionHeader label="Top Rated ->" />
        <ScrollContainer>
          <Container>
            {data?.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Container>
        </ScrollContainer> */}
      </div>
    );
  }
};

export default GameSearchView;

import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import TextAnimation from "../components/animations/TextAnimation";
import FadeIn from "../components/animations/FadeIn";
import { Content } from "../components/Tabs/Tab";
import { Button } from "../components/Button/Button";
import ScrollContainer from "react-indiana-drag-scroll";
import { Card } from "../components/Card/Card";
import { CardShows } from "../components/Card/CardShows";
import { CardGames } from "../components/Card/CardGames";
import { Input } from "../components/Input/Input";
import axios from "axios";
import { set } from "lodash";

const Hero = styled.div`
  margin: auto;
  text-align: center;
`;

const Heading = styled.h1`
  color: #000;
  font-size: 3rem;
  font-weight: 900;
  margin-top: 100px;
`;

const Spacer = styled.div`
  width: 200px;
  height: 50px;
  margin-right: 0px;
`;

const Row = styled.section`
  flex-direction: row;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  justify-content: center;
`;

export default function Home({ isConnected }) {
  const [active, setActive] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchUrls = {
    movieUrl:
      "https://api.themoviedb.org/3/search/movie?api_key=2ada9f8403fa9b543e95d8b22fdfef55&language=en-US&query=" +
      searchTerm +
      "&page=1&include_adult=false",
    showUrl:
      "https://api.themoviedb.org/3/search/tv?api_key=2ada9f8403fa9b543e95d8b22fdfef55&language=en-US&query=" +
      searchTerm +
      "&page=1&include_adult=false",
  };

  useEffect(() => {
    setSearchResults([]);
    setSearchTerm("");
  }, [active]); // <-- here put the parameter to listen

  let searchUrl = "";
  if (active == 0) {
    searchUrl = searchUrls.movieUrl;
  } else if (active == 1) {
    searchUrl = searchUrls.showUrl;
  }

  //set search term
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //search for movies and games

  const performSearch = () => {
    fetch(searchUrl)
      .then((response) => response.json())
      .then((responseData) => {
        setSearchResults(responseData.results);
        console.log(searchResults);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  //search for games

  const performSearchGames = () => {
    axios
      .post("api/games-search", {
        searchTerm: searchTerm,
      })
      .then(function (response) {
        console.log(response.data);
        setSearchResults(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //handle tab click
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Head>
      <Hero>
        <Heading>
          <TextAnimation />
          <Spacer></Spacer>
        </Heading>

        <FadeIn duration="2s" delay="2.5s">
          <Row>
            <Button active={active === 0} id={0} onClick={handleClick}>
              Movies
            </Button>

            <Button active={active === 1} id={1} onClick={handleClick}>
              Shows
            </Button>
            <Button active={active === 2} id={2} onClick={handleClick}>
              Games
            </Button>
          </Row>
        </FadeIn>
        <>
          <Content active={active === 0}>
            <Input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchTerm !== "") {
                    performSearch();
                  } else {
                    alert("Enter a search term dum dum");
                  }
                }
              }}
              type="text"
              placeholder="Movie Search"
              value={searchTerm}
              onChange={handleChange}
            />

            <Cards>
              {searchResults.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </Cards>
          </Content>
          <Content active={active === 1}>
            <Input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchTerm !== "") {
                    performSearch();
                  } else {
                    alert("Enter a search term dum dum");
                  }
                }
              }}
              type="text"
              placeholder="Show Search"
              value={searchTerm}
              onChange={handleChange}
            />

            <Cards>
              {searchResults.map((item) => (
                <CardShows key={item.id} item={item} />
              ))}
            </Cards>
          </Content>
          <Content active={active === 2}>
            <Input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (searchTerm !== "" && active === 2) {
                    performSearchGames();
                  } else {
                    alert("Enter a search term dum dum");
                  }
                }
              }}
              type="text"
              placeholder="Game Search"
              value={searchTerm}
              onChange={handleChange}
            />

            <Cards>
              {searchResults.map((item) => (
                <CardGames key={item.id} item={item} />
              ))}
            </Cards>
          </Content>
        </>
      </Hero>
    </>
  );
}

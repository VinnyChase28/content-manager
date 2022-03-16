/* pages/profile.js */
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import styled from "styled-components";
import getFavoriteMovies from "../hooks/content-hooks/get/useGetFavoriteMovies";
import getFavoriteShows from "../hooks/content-hooks/get/useGetFavoriteShows";
import getWatchlistMovies from "../hooks/content-hooks/get/useGetWatchlistMovies";
import getWatchlistShows from "../hooks/content-hooks/get/useGetWatchlistShows";
import getFavoriteGames from "../hooks/content-hooks/get/useGetFavoriteGames";
import getWatchlistGames from "../hooks/content-hooks/get/useGetWatchlistGames";
import { Card } from "../components/Card/Card";
import { CardProfile } from "../components/Card/CardProfile";
import { CardProfileShows } from "../components/Card/CardProfileShows";
import { CardProfileGames } from "../components/Card/CardProfileGames";
import { Content } from "../components/Tabs/Tab";
import FadeIn from "../components/animations/FadeIn";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { FcHeadset } from "react-icons/fc";
import { Button } from "../components/Button/Button";

import ScrollContainer from "react-indiana-drag-scroll";
import {
  SectionHeaderPopular,
  SectionHeaderRated,
  SectionHeaderUpcoming,
  SectionHeaderToday,
} from "../components/SectionHeader/SectionHeader";

import { CardContainer } from "../components/Scale/Scale";

import Layout from "../components/Navbar/layout";
import Sidebar from "../components/Navbar/Navbar";

const Center = styled.div`
  padding: 20px;
  text-align: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Row = styled.section``;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState(0);

  const { data: favMovieData } = getFavoriteMovies();
  const { data: favShowData } = getFavoriteShows();
  const { data: watchMovieData } = getWatchlistMovies();
  const { data: watchShowData } = getWatchlistShows();
  const { data: favGameData } = getFavoriteGames();
  const { data: watchGameData } = getWatchlistGames();

  const router = useRouter();
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const userData = await supabase.auth.user();
    if (!userData) {
      router.push("/sign-in");
    } else {
      setUser(userData);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  //handle tab click
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    } else if (index == active) {
      setActive(null);
    }
  };

  if (!user) return null;
  return (
    <div>
      <FadeIn duration="1s">
        <Center>
          <Row>
            <Row>
              <Button active={active === 0} id={0} onClick={handleClick}>
                Watchlist
              </Button>

              <Button active={active === 1} id={1} onClick={handleClick}>
                Favorites
              </Button>
            </Row>
          </Row>
        </Center>
        <Content active={active === 0}>
          <SectionHeaderRated label="Watchlist" />
          <ScrollContainer>
            <CardContainer>
              {watchMovieData?.map((item) => (
                <CardProfile key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <ScrollContainer>
            <CardContainer>
              {watchShowData?.map((item) => (
                <CardProfileShows key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <ScrollContainer>
            <CardContainer>
              {watchGameData?.map((item) => (
                <CardProfileGames key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
        </Content>
        <Content active={active === 1}>
          <SectionHeaderRated label="Favorites" />
          <ScrollContainer>
            <CardContainer>
              {favMovieData?.map((item) => (
                <CardProfile key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <ScrollContainer>
            <CardContainer>
              {favShowData?.map((item) => (
                <CardProfileShows key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
          <ScrollContainer>
            <CardContainer>
              {favGameData?.map((item) => (
                <CardProfileGames key={item.id} item={item} />
              ))}
            </CardContainer>
          </ScrollContainer>
        </Content>
      </FadeIn>
      <div onClick={signOut}>Sign Out</div>
    </div>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

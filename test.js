/* pages/profile.js */
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import styled from "styled-components";
import getFavoriteMovies from "../hooks/content-hooks/useGetFavoriteMovies";
import getFavoriteShows from "../hooks/content-hooks/useGetFavoriteShows";
import getWatchlistMovies from "../hooks/content-hooks/useGetWatchlistMovies";
import getWatchlistShows from "../hooks/content-hooks/useGetWatchlistShows";
import { Card } from "../components/Card/Card";

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  justify-content: center;
`;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const { favMovieData, isSuccess1, isLoading1 } = getFavoriteMovies();
  const { favShowData, isSuccess2, isLoading2 } = getFavoriteShows();
  const { watchMovieData, isSuccess3, isLoading3 } = getWatchlistMovies();
  const { watchShowData, isSuccess4, isLoading4 } = getWatchlistShows();
  console.log(favMovieData, favShowData, watchMovieData, watchShowData);
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
    router.push("/sign-up");
  }
  if (!user) return null;
  return (
    <div>
      <h2>Hello, {user.email}</h2>
      <p>User ID: {user.id}</p>
      <h1>Favorite Movies</h1>
      <Cards>
        {favMovieData?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Cards>
      <h1>Favorite Shows</h1>
      <Cards>
        {favShowData?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Cards>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

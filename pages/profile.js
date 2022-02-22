/* pages/profile.js */
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import styled from "styled-components";
import useRecommendations from "../hooks/content-hooks/useGetFavoriteMovies";
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
  const { data, isSuccess, isLoading } = useRecommendations();
  console.log(data);
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
        {data?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Cards>
      <h1>Favorite Movies</h1>
      <Cards>
        {data?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </Cards>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

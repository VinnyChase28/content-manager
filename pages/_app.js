import "../styles/globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../client";
import { useRouter } from "next/router";
import Navbar from "../components/NavBar/NavBar";
import NavbarAuthenticated from "../components/NavBar/NavBarAuthenticated";
import styled from "styled-components";
import {
  QueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "react-query";

const Nav = styled.nav`
  height: 100px;
  background-color: #000000;
  background-image: linear-gradient(315deg, #000000 0%, #414141 74%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const StyledLink = styled.a`
  position: relative;
  display: inline-block;
  margin: 15px 15px;
  outline: none;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 100;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.3);
  font-size: 1em;

  &:before,
  &:after {
    display: inline-block;
    opacity: 0;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.2s;
    -moz-transition: -moz-transform 0.3s, opacity 0.2s;
    transition: transform 0.3s, opacity 0.2s;
  }

  &:before {
    margin-right: 10px;
    content: "[";
    -webkit-transform: translateX(20px);
    -moz-transform: translateX(20px);
    transform: translateX(20px);
  }

  &:after {
    margin-left: 10px;
    content: "]";
    -webkit-transform: translateX(-20px);
    -moz-transform: translateX(-20px);
    transform: translateX(-20px);
  }

  &:hover::before,
  &:hover::after,
  &:focus::before,
  &:focus::after {
    opacity: 1;
    -webkit-transform: translateX(0px);
    -moz-transform: translateX(0px);
    transform: translateX(0px);
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticatedState, setAuthenticatedState] =
    useState("not-authenticated");
  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setAuthenticatedState("authenticated");
          router.push("/profile");
        }
        if (event === "SIGNED_OUT") {
          setAuthenticatedState("not-authenticated");
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkUser();
  });

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.user();
    if (user) {
      setAuthenticatedState("authenticated");
    } else {
      console.log("no user ahhhhhhhhhhhh");
    }
  }
  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  const CheckAuth = () => {
    if (authenticatedState === "authenticated") {
      return <NavbarAuthenticated />;
    } else {
      return <Navbar />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuth />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

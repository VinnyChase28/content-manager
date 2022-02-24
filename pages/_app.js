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
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import GoTop from "../components/GoTop/useGoTop";

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function MyApp({ Component, pageProps }) {
  //auth router
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
    <ModalProvider backgroundComponent={FadingBackground}>
      <QueryClientProvider client={queryClient}>
        <CheckAuth />
        <Component {...pageProps} />
        <GoTop className="back-to-top" />
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default MyApp;

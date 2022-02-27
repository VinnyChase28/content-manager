import "../styles/globals.css";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import styled from "styled-components";
import {
  QueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "react-query";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import GoTop from "../components/GoTop/useGoTop";

import Navbar from "../components/Navbar/Navbar";
import { device } from "../components/Device/Device";

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

const MenuLabel = styled.label`
  background-color: transparent;
  position: fixed;
  border-radius: 8px;
  top: 1.5rem;
  left: 2rem;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
  @media ${device.laptop} {
    display: none;
  }
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "white")};
  width: 2rem;
  height: 2px;
  display: inline-block;
  margin-top: 1.5rem;

  &::before,
  &::after {
    content: "";
    background-color: white;
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.8rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-1rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "1rem")};
  }
`;

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

  const [navToggled, setNavToggled] = useState(false);

  const handleNavToggle = () => {
    setNavToggled(!navToggled);
  };

  useEffect(() => {
    console.log(navToggled);
  }, [navToggled]);

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

  function NavToggle() {
    if (navToggled) {
      return <NavBar handleNavToggle={handleNavToggle} />;
    } else {
      return null;
    }
  }

  return (
    <ModalProvider backgroundComponent={FadingBackground}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <GoTop className="back-to-top" />
      </QueryClientProvider>
    </ModalProvider>
  );
}

export default MyApp;

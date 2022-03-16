import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { supabase } from "../../client";
import { useRouter } from "next/router";
import { device } from "../Device/Device";

import { Burger, Menu } from "../../components";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import FocusLock from "react-focus-lock";

export default function Navbar() {
  const userData = supabase.auth.user();

  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <MenuContainer>
      <Nav>
        <Hide>
          <div ref={node}>
            <FocusLock disabled={!open}>
              <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
              <Menu open={open} setOpen={setOpen} id={menuId} />
            </FocusLock>
          </div>
        </Hide>
        <Link href="/">
          <StyledLink>Search</StyledLink>
        </Link>
        <Link href="/movie-search">
          <StyledLink>Movies</StyledLink>
        </Link>
        <Link href="/show-search">
          <StyledLink>Shows</StyledLink>
        </Link>
        <Link href="/game-search">
          <StyledLink>Games</StyledLink>
        </Link>

        {userData ? (
          <Link href="/profile">
            <StyledLinkPink>My Content</StyledLinkPink>
          </Link>
        ) : (
          <>
            <Link href="/sign-in">
              <StyledLinkPink>Sign In</StyledLinkPink>
            </Link>
            <Link href="/sign-up">
              <StyledLinkPink>Sign Up</StyledLinkPink>
            </Link>
          </>
        )}
      </Nav>
    </MenuContainer>
  );
}

//media queries for menu

const Hide = styled.div``;

const MenuContainer = styled.div`
  font-family: "sans-serif";
  text-align: center;
  @media ${device.desktop} {
    max-width: 2560px;
  }
`;

//nav styles full

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
  @media only screen and (max-width: 900px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

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
  &:hover {
    cursor: pointer;
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

const StyledLinkPink = styled.a`
  @media only screen and (max-width: 900px) {
    display: none;
  }
  position: relative;
  display: inline-block;
  margin: 15px 15px;
  outline: none;
  color: pink;
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
  &:hover {
    cursor: pointer;
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

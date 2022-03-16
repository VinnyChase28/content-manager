import React from "react";
import { bool } from "prop-types";
import { StyledMenu } from "./Menu.styled";
import { supabase } from "../../client";

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const userData = supabase.auth.user();
  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Search
      </a>
      <a href="/movie-search" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Movies
      </a>
      <a href="/show-search" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Shows
      </a>
      <a href="/game-search" tabIndex={tabIndex}>
        <span aria-hidden="true"></span>
        Games
      </a>
      {userData ? (
        <a href="/profile" tabIndex={tabIndex}>
          <span aria-hidden="true"></span>
          Saved
        </a>
      ) : (
        <>
          <a href="/sign-in" tabIndex={tabIndex}>
            <span aria-hidden="true"></span>
            Sign In
          </a>
          <a href="/sign-up" tabIndex={tabIndex}>
            <span aria-hidden="true"></span>
            Sign Up
          </a>
        </>
      )}
      <a
        href="https://github.com/VinnyChase28/content-manager"
        target="_blank"
        tabIndex={tabIndex}
      >
        <span aria-hidden="true">Star ⭐</span>
      </a>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;

import styled from "styled-components";
import Link from "next/link";

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

const Navbar = (props) => {
  return (
    <Nav>
      <div>
        <Link href="/" passHref>
          <StyledLink>Search</StyledLink>
        </Link>
      </div>
      <div>
        <Link href="/movie-search" passHref>
          <StyledLink>Movies</StyledLink>
        </Link>
        <Link href="/show-search" passHref>
          <StyledLink>Shows</StyledLink>
        </Link>
        <Link href="/game-search" passHref>
          <StyledLink>Games</StyledLink>
        </Link>
        <Link href="/my-lists" passHref>
          <StyledLink>My Content</StyledLink>
        </Link>
        <Link href="/my-lists" passHref>
          <StyledLink>Sign Up</StyledLink>
        </Link>
        <Link href="/my-lists" passHref>
          <StyledLink>Sign In</StyledLink>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;

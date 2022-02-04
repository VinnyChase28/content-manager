import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  height: 80px;
  background: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const StyledLink = styled.a`
  padding: 0rem 2rem;
  text-decoration: underline 0.15em white;
  text-underline-offset: 0.2em;
  text-shadow: 1px 1px #ff1493;
  transition: text-decoration-color 1200ms, text-underline-offset 1200ms;
  content: "|";
  padding-left: 1em;
  &:hover {
    text-decoration-color: #ff1493;
    text-underline-offset: 0.4em;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div>
        <Link href="/" passHref>
          <StyledLink>Home</StyledLink>
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
        <Link href="/book-search" passHref>
          <StyledLink>Books</StyledLink>
        </Link>
        <Link href="/my-lists" passHref>
          <StyledLink>My Content</StyledLink>
        </Link>
      </div>
    </Nav>
  );
};

export default Navbar;

import styled from "styled-components";
import Link from "next/link";

const Nav = styled.nav`
  height: 80px;
  background: #40424a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const StyledLink = styled.a`
  padding: 0rem 2rem;
`;

const Navbar = () => {
  return (
    <Nav>
      <div>
        <Link href="/" passHref>
          <StyledLink>Contentorize</StyledLink>
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

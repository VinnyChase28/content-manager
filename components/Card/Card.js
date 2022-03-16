import { useRef, useState } from "react";
import styled from "styled-components";
import addFavoriteMovie from "../../hooks/content-hooks/add/useAddFavoriteMovie";
import addWatchlistMovie from "../../hooks/content-hooks/add/useAddWatchlistMovie";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import FadeIn from "../animations/FadeIn";
import {
  Col, Description, Img, ModalButton, Row, StyledModal,
  Title
} from "../Modal/Modal";
import SuccessMessage from "../Notifications/SuccessMessage";
import {
  Arrow, Button, CardImage,
  CardTextDate, CardTextTitle, CardTextWrapper, CardWrapper, Item
} from "./CardStyles";

export const Card = ({ item }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const addFavMovie = addFavoriteMovie(
    {
      movie_id: item.id,
      original_title: item.original_title,
      overview: item.overview,
      poster_path: item.poster_path,
      release_date: item.release_date,
      popularity: item.popularity,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre_ids: item.genre_ids,
    },
    []
  );

  const addWatchMovie = addWatchlistMovie(
    {
      movie_id: item.id,
      original_title: item.original_title,
      overview: item.overview,
      poster_path: item.poster_path,
      release_date: item.release_date,
      popularity: item.popularity,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre_ids: item.genre_ids,
    },
    []
  );

  const onClick = () => setIsActive(!isActive);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  const CheckIcon = styled.span`
    content: "\2713";
    color: green;
    font-size: 1em;
  `;

  const [clickFavorite, setClickFavorite] = useState(false);
  const [clickWatchlist, setClickWatchlist] = useState(false);

  return (
    <Item key={item.id}>
      <CardWrapper>
        <Button onClick={onClick}>
          <Arrow />
        </Button>

        <CardImage
          background={"https://image.tmdb.org/t/p/w500" + item.poster_path}
        />

        <CardTextWrapper>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <a
                  className="a-hover"
                  onClick={() => {
                    addFavMovie.mutate();
                    setClickFavorite(true);
                  }}
                >
                  {clickFavorite ? <SuccessMessage /> : "Add to Favorites"}
                </a>
              </li>
              <li>
                <a
                  className="a-hover"
                  onClick={() => {
                    addWatchMovie.mutate();
                    setClickWatchlist(true);
                  }}
                >
                  {clickWatchlist ? <SuccessMessage /> : "Add to Watchlist"}
                </a>
              </li>
              <li>
                <div>
                  <a className="a-hover" onClick={toggleModal}>
                    View
                  </a>
                  <FadeIn>
                    <StyledModal
                      isOpen={isOpen}
                      afterOpen={afterOpen}
                      beforeClose={beforeClose}
                      onBackgroundClick={toggleModal}
                      onEscapeKeydown={toggleModal}
                      opacity={opacity}
                      backgroundProps={{ opacity }}
                    >
                      <Title>{item.original_title}</Title>
                      <Row>
                        <Col>
                          <Description>{item.overview}</Description>
                        </Col>
                        <Img
                          src={
                            "https://image.tmdb.org/t/p/w500" + item.poster_path
                          }
                        />
                      </Row>
                      <ModalButton onClick={toggleModal}>Close</ModalButton>
                    </StyledModal>
                  </FadeIn>
                </div>
              </li>
            </ul>
          </nav>
          <CardTextDate>{item.release_date}</CardTextDate>

          <CardTextTitle>{item.original_title}</CardTextTitle>
        </CardTextWrapper>
      </CardWrapper>
    </Item>
  );
};

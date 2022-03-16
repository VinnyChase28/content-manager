import {
  CardWrapper,
  CardImage,
  CardTextDate,
  Item,
  CardTextWrapper,
  CardTextTitle,
  Button,
  Arrow,
  DropdownContent,
} from "./CardStyles";
import { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import FadeIn from "../animations/FadeIn";
import delFavoriteMovie from "../../hooks/content-hooks/delete/useDelFavoriteMovie";
import delWatchlistMovie from "../../hooks/content-hooks/delete/useDelWatchlistMovie";

import {
  StyledModal,
  Title,
  Row,
  Col,
  Img,
  Description,
  ModalButton,
} from "../Modal/Modal";

export const CardProfile = ({ item }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const delFavMovie = delFavoriteMovie(
    {
      movie_id: item.movie_id,
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

  const delWatchMovie = delWatchlistMovie(
    {
      movie_id: item.movie_id,
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

  function deleteContent() {
    delWatchMovie.mutate();
    delFavMovie.mutate();
  }

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

  return (
    <Item key={item.id}>
      <CardWrapper>
        <Button onClick={onClick}>
          <Arrow />
        </Button>

        <DropdownContent>Test</DropdownContent>
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
                <a className="a-hover" onClick={() => deleteContent()}>
                  Remove
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

import { useRef, useState } from "react";
import addFavoriteShow from "../../hooks/content-hooks/add/useAddFavoriteShow";
import addWatchlistShow from "../../hooks/content-hooks/add/useAddWatchlistShow";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import FadeIn from "../animations/FadeIn";
import {
  Col, Description, Img, ModalButton, Row, StyledModal,
  Title
} from "../Modal/Modal";
import {
  Arrow, Button, CardImage,
  CardTextDate, CardTextTitle, CardTextWrapper, CardWrapper, DropdownContent, Item
} from "./CardStyles";


export const CardShows = ({ item }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const addFavShow = addFavoriteShow(
    {
      show_id: item.id,
      original_name: item.original_name,
      overview: item.overview,
      poster_path: item.poster_path,
      popularity: item.popularity,
      first_air_date: item.first_air_date,
      vote_average: item.vote_average,
      vote_count: item.vote_count,
      genre_ids: item.genre_ids,
    },
    []
  );

  const addWatchShow = addWatchlistShow(
    {
      show_id: item.id,
      original_name: item.original_name,
      overview: item.overview,
      poster_path: item.poster_path,
      popularity: item.popularity,
      first_air_date: item.first_air_date,
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
                <a className="a-hover" onClick={() => addFavShow.mutate()}>
                  Favorite
                </a>
              </li>
              <li>
                <a className="a-hover" onClick={() => addWatchShow.mutate()}>
                  Add to Watchlist
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
                      <Title>{item.name}</Title>
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
          <CardTextDate>{item.first_air_date}</CardTextDate>

          <CardTextTitle>{item.original_name}</CardTextTitle>
        </CardTextWrapper>
      </CardWrapper>
    </Item>
  );
};

import { useRef, useState } from "react";
import delFavoriteShow from "../../hooks/content-hooks/delete/useDelFavoriteShow";
import delWatchlistShow from "../../hooks/content-hooks/delete/useDelWatchlistShow";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import FadeIn from "../animations/FadeIn";
import {
  Col, Description, Img, ModalButton, Row, StyledModal,
  Title
} from "../Modal/Modal";
import {
  Arrow, Button, CardImage,
  CardTextDate, CardTextTitle, CardTextWrapper, CardWrapper, Item
} from "./CardStyles";

export const CardProfileShows = ({ item }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const delFavShow = delFavoriteShow(
    {
      show_id: item.show_id,
    },
    []
  );

  const delWatchShow = delWatchlistShow(
    {
      show_id: item.show_id,
    },
    []
  );

  const deleteShows = () => {
    delWatchShow.mutate();
    delFavShow.mutate();
  };

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
                <a className="a-hover" onClick={() => deleteShows()}>
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
                      <Title>{item.original_name}</Title>
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

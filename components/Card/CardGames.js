import {
  CardWrapper,
  CardImage,
  CardTextDate,
  Item,
  CardTextWrapper,
  CardTextTitle,
} from "./CardStylesGames";

import { Button, Arrow, DropdownContent } from "./CardStyles";

import { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import FadeIn from "../animations/FadeIn";
import addFavoriteGame from "../../hooks/content-hooks/add/useAddFavoriteGame";
import addWatchlistGame from "../../hooks/content-hooks/add/useAddWatchlistGame";

const StyledModal = Modal.styled`
  width: 1000px;
  display: flex;
  border-radius: 18px;
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  background-color: rgb(32, 32, 32);
  background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(to bottom, rgb(8, 8, 8), rgb(32, 32, 32));
  background-size: 10px 10px, 10px 10px, 10px 5px;
  background-position: 0px 0px, 5px 5px, 0px 0px;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: white;
  margin: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px;
`;

const Col = styled.div`
  flex: ${(props) => props.size};
`;

const Img = styled.img`
  width: 300px;
  border-radius: 18px;
  margin: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: white;
  font-family: "Montserrat", sans-serif;
`;

Img.defaultProps = {
  src: null,
};

const ModalButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: white;
  border-radius: 3px;
  max-width: 250px;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  border-radius: 10px;
  color: black;
  margin: 1em;
  padding: 1em 3em;
  scale(0.7);
  &:hover {
    background: #FFB6C1;
  transition: background-color 0.5s ease-out 100ms;
    cursor: pointer;
  }
  &:active {
    background: #FFB6C1;
  transition: background-color 0.5s ease-out 100ms;
    cursor: pointer;
  }
  
  }
  }
`;

export const CardGames = ({ item }) => {
  const unixTimestamp = item.first_release_date;
  const milliseconds = unixTimestamp * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toDateString();
  let idgmImgId = item.cover?.image_id || null;
  let idgmImgURL =
    "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/" +
    idgmImgId +
    ".jpg";

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const addFavGame = addFavoriteGame(
    {
      game_id: item.id,
      name: item.name,
      summary: item.summary,
      image_id: item.cover?.image_id || null,
      first_release_date: item.first_release_date,
    },
    []
  );

  const addWatchGame = addWatchlistGame(
    {
      game_id: item.id,
      name: item.name,
      summary: item.summary,
      image_id: item.cover.image_id,
      first_release_date: item.first_release_date,
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

        <CardImage background={idgmImgURL} />
        <CardTextWrapper>
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <a className="a-hover" onClick={() => addFavGame.mutate()}>
                  Favorite
                </a>
              </li>
              <li>
                <a className="a-hover" onClick={() => addWatchGame.mutate()}>
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
                          <Description>{item.summary}</Description>
                          <Row>
                            <ModalButton onClick={() => addMovie.mutate()}>
                              + Favorite
                            </ModalButton>
                            <ModalButton>+ Watchlist</ModalButton>
                          </Row>
                        </Col>
                        <Img src={idgmImgURL} />
                      </Row>
                      <ModalButton onClick={toggleModal}>Close</ModalButton>
                    </StyledModal>
                  </FadeIn>
                </div>
              </li>
            </ul>
          </nav>
          <CardTextDate>{humanDateFormat}</CardTextDate>

          <CardTextTitle>{item.name}</CardTextTitle>
        </CardTextWrapper>
      </CardWrapper>
    </Item>
  );
};

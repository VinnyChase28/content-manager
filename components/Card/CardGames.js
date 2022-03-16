import { useRef, useState } from "react";
import addFavoriteGame from "../../hooks/content-hooks/add/useAddFavoriteGame";
import addWatchlistGame from "../../hooks/content-hooks/add/useAddWatchlistGame";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import FadeIn from "../animations/FadeIn";
import {
  Col, Description, Img, ModalButton, Row, StyledModal,
  Title
} from "../Modal/Modal";
import { Arrow, Button } from "./CardStyles";
import {
  CardImage,
  CardTextDate, CardTextTitle, CardTextWrapper, CardWrapper, Item
} from "./CardStylesGames";



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
      image_id: item.cover?.image_id,
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

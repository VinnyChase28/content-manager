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

export const Card = ({ item }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  useEffect(() => {
    console.log(isActive);
  }, [isActive]); // <-- here put the parameter to listen

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
                <a href="/messages">Favorite</a>
              </li>
              <li>
                <a href="/trips">Add to Watchlist</a>
              </li>
              <li>
                <a href="/saved">View</a>
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

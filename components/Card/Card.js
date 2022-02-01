import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextDate,
  CardTextTitle,
  CardTextBody,
  CardStatWrapper,
  CardStats,
  LinkText,
  Item,
} from "./CardStyles";

export const Card = ({ item }) => {
  return (
    <Item key={item.id}>
      <CardWrapper>
        <CardImage
          background={"https://image.tmdb.org/t/p/w500" + item.poster_path}
        />

        <CardTextDate>{item.release_date}</CardTextDate>
      </CardWrapper>
    </Item>
  );
};

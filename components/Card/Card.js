import {
  CardWrapper,
  CardImage,
  CardTextDate,
  Item,
  CardTextWrapper,
  CardTextTitle,
} from "./CardStyles";

export const Card = ({ item }) => {
  return (
    <Item key={item.id}>
      <CardWrapper>
        <CardImage
          background={"https://image.tmdb.org/t/p/w500" + item.poster_path}
        />
        <CardTextWrapper>
          <CardTextDate>{item.release_date}</CardTextDate>

          <CardTextTitle>{item.original_title}</CardTextTitle>
        </CardTextWrapper>
      </CardWrapper>
    </Item>
  );
};

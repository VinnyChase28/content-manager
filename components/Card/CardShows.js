import {
  CardWrapper,
  CardImage,
  CardTextDate,
  Item,
  CardTextWrapper,
  CardTextTitle,
} from "./CardStyles";

export const CardShows = ({ item }) => {
  return (
    <Item key={item.id}>
      <CardWrapper>
        <CardImage
          background={"https://image.tmdb.org/t/p/w500" + item.poster_path}
        />
        <CardTextWrapper>
          <CardTextDate>{item.first_air_date}</CardTextDate>

          <CardTextTitle>{item.name}</CardTextTitle>
        </CardTextWrapper>
      </CardWrapper>
    </Item>
  );
};

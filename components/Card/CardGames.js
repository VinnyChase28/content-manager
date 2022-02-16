import {
  CardWrapper,
  CardImage,
  CardTextDate,
  Item,
  CardTextWrapper,
  CardTextTitle,
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
  return (
    <Item key={item.id}>
      <CardWrapper>
        <CardImage background={idgmImgURL} />
        <CardTextWrapper>
          <CardTextDate>{humanDateFormat}</CardTextDate>

          <CardTextTitle>{item.name}</CardTextTitle>
        </CardTextWrapper>
      </CardWrapper>
    </Item>
  );
};

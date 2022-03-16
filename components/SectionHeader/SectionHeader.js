import styled from "styled-components";
import { Star, Chart, Calendar, UpArrow } from "styled-icons/boxicons-regular";

const HeaderStyle = styled.text`
  color: black;
  padding: 20px;
  margin-left: 100px;
  font-size: 2em;
  font-weight: bold;
  @media only screen and (max-width: 425px) {
    margin-left: 20px;
  }
`;

const Wrapper = styled.section`
  padding: 4em;
  @media only screen and (max-width: 425px) {
    padding: 1em;
  }
  display: flex;
  align-items: center;
`;

export const SectionHeaderPopular = (props) => {
  return (
    <Wrapper>
      <>
        <HeaderStyle>{props.label}</HeaderStyle>
        <Chart style={{ height: 50, width: 50 }} />
      </>
    </Wrapper>
  );
};
export const SectionHeaderRated = (props) => {
  return (
    <Wrapper>
      <HeaderStyle>{props.label}</HeaderStyle>
      <Star style={{ height: 50, width: 50 }} />
    </Wrapper>
  );
};

export const SectionHeaderUpcoming = (props) => {
  return (
    <Wrapper>
      <HeaderStyle>{props.label}</HeaderStyle>
      <UpArrow style={{ height: 50, width: 50 }} />
    </Wrapper>
  );
};

export const SectionHeaderToday = (props) => {
  return (
    <Wrapper>
      <HeaderStyle>{props.label}</HeaderStyle>
      <Calendar style={{ height: 50, width: 50 }} />
    </Wrapper>
  );
};

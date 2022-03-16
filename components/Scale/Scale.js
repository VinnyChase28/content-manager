import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  margin-bottom: 50px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
  @media only screen and (max-width: 425px) {
    transform: scale(0.7);
    margin-bottom: 0px;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

export const CardContainerSearch = styled.div`
  @media only screen and (max-width: 425px) {
    transform: scale(0.7);
  }
`;

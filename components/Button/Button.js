import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  color: black;
  margin: 0 1em;
  padding: 1em 3em;
  margin-top: 10px;
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
`;

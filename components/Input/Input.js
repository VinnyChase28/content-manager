import styled from "styled-components";

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  width: 900px;
  font-size: 18px;
  padding: 10px;
  margin: 30px;
  background: gray;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: pink;
  }
`;

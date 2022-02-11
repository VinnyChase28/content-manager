import styled from "styled-components";
export const Tabs = styled.div`
  overflow: hidden;
  font-family: Open Sans;
  flex-direction: row;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  padding: 12px 16px;
  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${(props) => (props.active ? "none" : "")};
  height: ${(props) => (props.active ? "7em" : "6.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;
  :hover {
    background-color: white;
  }
`;
export const Content = styled.div`
  ${(props) => (props.active ? "" : "display:none")}
`;

import styled from "styled-components";
import { MoviePlay, Tv, Game } from "styled-icons/boxicons-regular";

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const IconButton = (props) => {
  const renderIcon = () => {
    switch (props.btnText) {
      case "Movies":
        return <MoviePlay />;
      case "TV Shows":
        return <Tv />;
      case "Games":
        return <Game />;
    }
  };
  return (
    <div>
      <button>
        {props.renderIcon} {props.btnText}
      </button>
    </div>
  );
};

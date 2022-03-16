import styled from "styled-components";
import Modal from "styled-react-modal";

export const StyledModal = Modal.styled`
  width: 1000px;
  display: flex;
  border-radius: 18px;
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  max-height: 200vh;
  align-items: center;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  background-color: rgb(32, 32, 32);
  background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), linear-gradient(to bottom, rgb(8, 8, 8), rgb(32, 32, 32));
  background-size: 10px 10px, 10px 10px, 10px 5px;
  background-position: 0px 0px, 5px 5px, 0px 0px;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  @media only screen and (max-width: 900px) {
    transform: scale(0.8);
  }
  @media only screen and (max-width: 350px) {
    transform: scale(0.7);
    padding: 10px;
  }
  `;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: white;
  margin: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 40px;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

export const Img = styled.img`
  width: 300px;
  border-radius: 18px;
  margin: 20px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: white;
  font-family: "Montserrat", sans-serif;
  @media only screen and (max-width: 900px) {
    transform: scale(0.9);
  }
`;

export const ModalButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: white;
  border-radius: 3px;
  max-width: 250px;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  border-radius: 10px;
  color: black;
  margin: 1em;
  padding: 1em 3em;
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
  }
`;

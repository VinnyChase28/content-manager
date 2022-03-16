import styled from "styled-components";

export const InputWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;
export const Input = styled.input`
  display: inline-block; /* inline by default */
  width: 100%; /* allow this to just 'work' based on parent context */
  font-size: 18px;
  max-width: 600px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  justify-content: center;
  background: gray;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  resize: vertical;
  ::placeholder {
    color: pink;
  }
`;

export const AuthInput = styled.input`
  display: inline-block; /* inline by default */
  width: 100%; /* allow this to just 'work' based on parent context */
  font-size: 18px;
  max-width: 600px;
  padding: 10px;
  background: gray;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  resize: vertical;
  ::placeholder {
    color: pink;
  }
`;

// padding: 12px;
// border: 1px solid #ccc;
// border-radius: 4px;
// box-sizing: border-box;
// resize: vertical;
// max-width: 600px;

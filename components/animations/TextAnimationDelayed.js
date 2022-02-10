import React from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
 from { width: 0 }
  to { width: 100% }
`;

const Wrapper = styled.span`
  animation-name: ${animation};
  animation-duration: 4s;
  animation-fill-mode: forwards;
`;

export default function TextAnimation(props) {
  return <Wrapper>{props.text}</Wrapper>;
}

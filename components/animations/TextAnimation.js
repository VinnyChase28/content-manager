import React from "react";
import styled from "styled-components";
import FadeIn from "./FadeIn";
import FadeInAndOut from "./FadeInAndOut";

const Text1 = styled.text`
  font-size: 0.75em;
  position: absolute;
  width: 300px;
  top: 50%; /* position the top  edge of the element at the middle of the parent */
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text2 = styled.text`
  font-size: 0.75em;
  position: absolute;
  width: 300px;
  top: 100%; /* position the top  edge of the element at the middle of the parent */
  left: 100%; /* position the left edge of the element at the middle of the parent */
  transform: translate(
    -50%,
    -50%
  ); /* This is a shorthand of
                                         translateX(-50%) and translateY(-50%) */
`;

const Wrapper = styled.span`
  position: relative;
  text-align: center;
`;

export default function TextAnimation(props) {
  return (
    <div>
      <Wrapper>
        <FadeInAndOut duration="1s" delay="0.2s">
          <Text1>Welcome</Text1>
        </FadeInAndOut>
        <FadeIn duration="1s" delay="1.2s">
          <Text2>What would you like to search?</Text2>
        </FadeIn>
      </Wrapper>
    </div>
  );
}

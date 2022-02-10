import styled, { keyframes } from "styled-components";
import BaseAnimation from "./BaseAnimation";
const FadeInAnimation = keyframes`  
  0% { opacity: 0;}
  25% { opacity: 1;}
  75% { opacity: 1;}
  100% { opacity: 0;}
  
`;
const FadeInAndOut = styled(BaseAnimation)`
  animation-name: ${FadeInAnimation};
`;
export default FadeInAndOut;

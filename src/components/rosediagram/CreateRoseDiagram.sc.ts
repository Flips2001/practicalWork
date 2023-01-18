import styled from "styled-components";

export interface RootPros {
	position: {
		x: number;
		y: number
	}
}

export const Root = styled("div")<RootPros>`
  position: absolute;
  left: ${(props) => props.position.x}px;
  bottom: ${(props) => props.position.y}px;
  height: 300px;
  width: 300px;
  transform: translate(-50%, 50%) rotate(-45deg);
`;

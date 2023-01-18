import styled from "styled-components";

export interface RootPros {
	position: {
		x: number;
		y: number
	}
	color?: string
}

export const Point = styled("div")<RootPros>`
  background-color: ${(props) => props.color ?? "red"};
  width: 10px;
  height: 10px;
  position: absolute;
  left: ${(props) => props.position.x}px;
  bottom: ${(props) => props.position.y}px;
`;

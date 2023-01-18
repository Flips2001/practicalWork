import styled from "styled-components";

export const Root = styled("div")`
  text-align: center;
  flex-direction: row;
  Display: flex;
`;

export const MapContainer = styled("div")`
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 10px;
`;

export const InputSideBar = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 0 0 60px 60px;
  align-items: flex-start;
  gap: 10px;
`;

export const TitleContainer = styled("div")`
  display: flex;
  padding: 40px;
  align-items: center;
  justify-content: center;
`;
export const Title = styled("div")`
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 900;
`;

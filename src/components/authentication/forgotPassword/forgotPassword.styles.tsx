import styled from "styled-components";
import Theme from "../../../theme";
import Colors from "../../../assets/scss/_themes-vars.module";

const theme = Theme.palette.primary.light;

const COLORS = Colors();

export const Container = styled.div`
  background-color: ${theme};
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(144, 202, 249, 0.46);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 450px;
  //width: 30vw;
`

export const Description = styled.span`
  color: ${COLORS.grayMain};
  text-align: center;
  width: 80%;
`

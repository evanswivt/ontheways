import styled from 'styled-components'
import Theme from "../../../theme";

const theme = Theme.palette.primary.light;

export const LoginContainer = styled.div`
  background-color: ${theme};
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


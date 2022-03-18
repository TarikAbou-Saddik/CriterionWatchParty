import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    width: ${({ theme }) => theme.width};
    color: ${({ theme }) => theme.textPrimary};
    border-radius: 15px;
  }

`;

const fontsDirPrefix = '../fonts/Montserrat';
export const ChatStyles = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif !important;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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
    overflow-y: hidden;
  }

`;

export default GlobalStyles;
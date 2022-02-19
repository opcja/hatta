import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 80px 65px 0;
    font-family: 'Montserrat';
  }
  button {
    padding: 0;
    cursor: pointer;
    font-family: 'Montserrat';
  }

  h1 {
    font-size: 52px;  
    margin-bottom: 12px;
    margin-top: 64px;
  }

  p {
    font-size: 18px;
  }
  ul {
    padding: 0;
    margin: 0;
  }
`

export default GlobalStyles

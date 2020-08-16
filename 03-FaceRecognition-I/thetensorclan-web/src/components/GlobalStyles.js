import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        font-family: ${(props) => props.theme.fontFamily};
        background: #ffffff;
    }
`;

export default GlobalStyles;

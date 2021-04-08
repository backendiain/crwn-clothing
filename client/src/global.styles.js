import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    body{
        padding:20px 60px;
        font-family:'Open Sans Condensed', helvetica, arial, sans-serif;

        @media screen and (max-width:800px) {
            padding:10px;
        }
    }

    a{
        text-decoration: none;
        color:black;
    }
`;
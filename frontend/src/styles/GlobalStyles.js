import {createGlobalStyle} from 'styled-components';
import OdibeeSans from '../fonts/OdibeeSans-Regular.ttf';
import ReadexPro from '../fonts/ReadexPro-VariableFont_wght.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Odibee Sans';
        src: local('Odibee Sans'), url(${OdibeeSans}) format('truetype');
        /* other formats include: 'woff2', 'truetype, 'opentype',
            'embedded-opentype', and 'svg' */
    }

    @font-face {
        font-family: 'Readex Pro';
        src: local('Readex Pro'), url(${ReadexPro}) format('truetype');
        /* other formats include: 'woff2', 'truetype, 'opentype',
            'embedded-opentype', and 'svg' */
    }

    * {
        box-sizing: border-box;
    }

    html, body {
        padding: 0;
        margin: 0;
    }

`;

export default GlobalStyle;
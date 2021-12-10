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

    /*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

`;

export default GlobalStyle;
import React from "react";
import { ThemeProvider } from "styled-components"

import GlobalStyle from "../src/styles/GlobalStyles";

const colors = ['#5900ff', '#00d985', '#303030']

const theme = {
   mainOutlineColor: colors[2],
   primaryMessageTextColor: colors[1],
   secondaryMessageTextColor: colors[0]
};

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
     <GlobalStyle />
     {storyFn()}
   </ThemeProvider>
)

export default ThemeDecorator
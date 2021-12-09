import React from "react";
import { ThemeProvider } from "styled-components"

import GlobalStyle from "../src/styles/GlobalStyles";

const colors = ['#5900ff', '#00d985']

const theme = {
   primaryMessageTextColor: '#00d985',
   secondaryMessageTextColor: '#5900ff'
};

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>
     <GlobalStyle />
     {storyFn()}
   </ThemeProvider>
)

export default ThemeDecorator
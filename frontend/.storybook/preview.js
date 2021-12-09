import React from "react";

import { addDecorator } from "@storybook/react";

import ThemeDecorator from "./themeDecorator";



// Emotion Theme Provider =====================
addDecorator(ThemeDecorator);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
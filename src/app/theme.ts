import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./recipes";



const config = defineConfig({
  //configurating the project theme.
  strictTokens: true, //only using strict variables, instead of random values (red.400 instead of #00ff00)
  theme: {
    tokens: {
      fonts: {
        body: {value: `var(--font-dm-sans)`}, //changing the default font of the site.
        heading: { value: `var(--font-dm-sans)` },
        mono: { value: "var(--font-jetbrains-mono)"}
      },
      radii: {
        sm: {value: ".475rem"},
        md: {value: "0.525rem"},
        lg: {value: ".825rem"},
        xl: {value: "1rem"}
      }
    },
    recipes:{
      button: buttonRecipe
    }
  },
});

export const system = createSystem(defaultConfig, config); //creating the theme system so chakra can use it properluy.

import cornerShapePlugin from "tailwindcss-corner-shape";

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      plugins: [cornerShapePlugin()]
    },
  },
};

export default config;

import StyleDictionary from "style-dictionary";
import formatters from "./formatter";

const dict = StyleDictionary.registerFormat(
  formatters["typescript/object"]
).extend({
  source: ["src/tokens/tokens.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables",
        },
      ],
    },
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    ts: {
      buildPath: "build/ts/",
      files: [
        {
          destination: "variables.ts",
          format: "typescript/object",
        },
      ],
    },
  },
});

dict.buildAllPlatforms();

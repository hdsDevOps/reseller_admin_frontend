import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'm86ms1',
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});

import path from "path";

export default {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  eslint: {
    enable: true /* (default value) */,
    mode: "extends" /* (default value) */ || "file",
    configure: (eslintConfig, { env, paths }) => {
      return eslintConfig;
    },
    pluginOptions: (eslintPluginOptions, { env, paths }) => {
      return eslintPluginOptions;
    },
  },
};

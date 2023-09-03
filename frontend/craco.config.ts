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
    configure: (eslintConfig: any) => {
      return eslintConfig;
    },
    pluginOptions: (eslintPluginOptions: any) => {
      return eslintPluginOptions;
    },
  },
};

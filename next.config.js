/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ["geist"],
  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  rewrites: async () => {
    return [
      {
        source: "/api/rpc",
        destination: process.env.RPC_URL ?? "https://rpc.ankr.com/eth",
      },
    ];
  },
};

export default config;

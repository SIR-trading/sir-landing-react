import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
const zAddress = z.string().length(42).startsWith("0x");
export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    RPC_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CHAIN_ID: z.string(),
    NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS: zAddress,
    NEXT_PUBLIC_BUTERIN_CARDS: zAddress,
    NEXT_PUBLIC_MINED_JPEG: zAddress,
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS:
      process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS,
    RPC_URL: process.env.RPC_URL,
    NEXT_PUBLIC_BUTERIN_CARDS: process.env.NEXT_PUBLIC_BUTERIN_CARDS,
    NEXT_PUBLIC_MINED_JPEG: process.env.NEXT_PUBLIC_MINED_JPEG,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

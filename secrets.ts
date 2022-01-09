import "https://deno.land/x/dotenv@v3.1.0/load.ts";

const env = Deno.env.get("ENVIRONMENT") ?? "dev";

let DOMAIN: string | undefined;
let PAYEE: string | undefined;
let SHARED_SECRET: string | undefined;
let SWISH_DOMAIN: string | undefined;

if (env == "prod") {
  DOMAIN = Deno.env.get("PROD_DOMAIN");
  if (!DOMAIN) {
    throw new Error("environment variable PROD_DOMAIN not set");
  }

  PAYEE = Deno.env.get("PROD_PAYEE");
  if (!PAYEE) {
    throw new Error("environment variable PROD_PAYEE not set");
  }

  SHARED_SECRET = Deno.env.get("PROD_SHARED_SECRET");
  if (!SHARED_SECRET) {
    throw new Error("environment variable PROD_SHARED_SECRET not set");
  }

  SWISH_DOMAIN = Deno.env.get("PROD_SWISH_DOMAIN");
  if (!SWISH_DOMAIN) {
    throw new Error("environment variable PROD_SWISH_DOMAIN not set");
  }
} else {
  DOMAIN = Deno.env.get("DEV_DOMAIN");
  if (!DOMAIN) {
    throw new Error("environment variable DEV_DOMAIN not set");
  }

  PAYEE = Deno.env.get("DEV_PAYEE");
  if (!PAYEE) {
    throw new Error("environment variable DEV_PAYEE not set");
  }

  SHARED_SECRET = Deno.env.get("DEV_SHARED_SECRET");
  if (!SHARED_SECRET) {
    throw new Error("environment variable DEV_SHARED_SECRET not set");
  }

  SWISH_DOMAIN = Deno.env.get("DEV_SWISH_DOMAIN");
  if (!SWISH_DOMAIN) {
    throw new Error("environment variable DEV_SWISH_DOMAIN not set");
  }
}

export { DOMAIN, PAYEE, SHARED_SECRET, SWISH_DOMAIN };

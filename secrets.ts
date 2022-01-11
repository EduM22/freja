import "https://deno.land/x/dotenv@v3.1.0/load.ts";

const env = Deno.env.get("ENVIRONMENT") ?? "dev";

let DOMAIN: string | undefined;
let PAYEE: string | undefined;
let SHARED_SECRET: string | undefined;
let SWISH_DOMAIN: string | undefined;
let SWISH_CA: string | undefined;
let SWISH_PUBLIC: string | undefined;
let SWISH_PRIVATE: string | undefined;

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

  SWISH_CA = Deno.env.get("PROD_SWISH_CA_CERT");
  if (!SWISH_CA) {
    throw new Error("environment variable PROD_SWISH_CA_CERT not set");
  }

  SWISH_PUBLIC = Deno.env.get("PROD_SWISH_PUBLIC_CERT");
  if (!SWISH_PUBLIC) {
    throw new Error("environment variable PROD_SWISH_PUBLIC_CERT not set");
  }

  SWISH_PRIVATE = Deno.env.get("PROD_SWISH_PRIVATE_CERT");
  if (!SWISH_PRIVATE) {
    throw new Error("environment variable PROD_SWISH_PRIVATE_CERT not set");
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

  SWISH_CA = Deno.env.get("DEV_SWISH_CA_CERT");
  if (!SWISH_CA) {
    throw new Error("environment variable DEV_SWISH_CA_CERT not set");
  }

  SWISH_PUBLIC = Deno.env.get("DEV_SWISH_PUBLIC_CERT");
  if (!SWISH_PUBLIC) {
    throw new Error("environment variable DEV_SWISH_PUBLIC_CERT not set");
  }

  SWISH_PRIVATE = Deno.env.get("DEV_SWISH_PRIVATE_CERT");
  if (!SWISH_PRIVATE) {
    throw new Error("environment variable DEV_SWISH_PRIVATE_CERT not set");
  }
}

SWISH_CA = atob(SWISH_CA)
SWISH_PUBLIC = atob(SWISH_PUBLIC)
SWISH_PRIVATE = atob(SWISH_PRIVATE)

export { DOMAIN, PAYEE, SHARED_SECRET, SWISH_DOMAIN, SWISH_CA, SWISH_PUBLIC, SWISH_PRIVATE };

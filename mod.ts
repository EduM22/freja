import { serve } from "https://deno.land/std@0.120.0/http/mod.ts";
import { Router } from "https://cdn.skypack.dev/itty-router?dts";

import { CreateSwishPayment } from "./swish.ts";

const router = Router();

// @ts-ignore The method is not defined in types
router.get("*", async (_: Request) => {
  try {
    const data = await CreateSwishPayment({
      reference: "0123456789",
      amount: "100",
      message: "Kingston USB Flash Drive 8 GB",
      payer: "4671234768",
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(`Error ${error.message ?? "unknown"}`, { status: 500 });
  }
});

// @ts-ignore The method is not defined in types
router.post("/hook/:id", (_: Request) => {
  return new Response("hook", { status: 200 });
});

// @ts-ignore The method is not defined in types
router.all("*", () => new Response("Not Found.", { status: 404 }));

// @ts-ignore The method is not defined in types
await serve(router.handle);

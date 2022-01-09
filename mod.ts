import { CreateSwishPayment } from "./swish.ts";
import { encode, Router, serve } from "./deps.ts";
import { SHARED_SECRET } from "./secrets.ts";
import { SwishCallbackResponse, SwishRequest, swishSchema } from "./utils.ts";

const router = Router();

// @ts-ignore The method is not defined in types
router.post("/pay", async (req: Request) => {
  try {
    const swishRequest : SwishRequest = await req.json();

    await swishSchema.validate(swishRequest);

    const data = await CreateSwishPayment({
      reference: swishRequest.reference,
      amount: swishRequest.amount,
      message: swishRequest.message,
      payer: swishRequest.payer,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(`Error ${error.message ?? "unknown"}`, { status: 500 });
  }
});

// @ts-ignore The method is not defined in types
router.post("/hook/:id", async (req: Request) => {
  try {
    const swishCallback : SwishCallbackResponse = await req.json();

    // @ts-expect-error not on Request
    const { id } = req.params;

    const encodedData = new TextEncoder().encode(JSON.stringify({
      id: swishCallback.id,
    }));
    const encoded = encode(encodedData);
    const encDataNSecret = encode(
      new TextEncoder().encode(encoded + SHARED_SECRET),
    );

    const hashBuffer = new Uint8Array(
      await crypto.subtle.digest(
        "SHA-512",
        new TextEncoder().encode(encDataNSecret),
      ),
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
      "",
    );

    if (id !== hashHex) {
      throw new Error("Not same hash");
    }

    return new Response("hook", { status: 200 });
  } catch (error) {
    return new Response(`error ${JSON.stringify(error)}`, { status: 500 });
  }
});

// @ts-ignore The method is not defined in types
router.all("*", () => new Response("Not Found.", { status: 404 }));

// @ts-ignore The method is not defined in types
await serve(router.handle);

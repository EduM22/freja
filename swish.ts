import { encode } from "./deps.ts";
import { DOMAIN, PAYEE, SHARED_SECRET, SWISH_DOMAIN } from "./secrets.ts";

export async function CreateSwishPayment(params: {
  message: string;
  amount: string;
  payer: string;
  reference: string;
}) {
  const caCert = await Deno.readTextFile("./cert/ca.pem");
  const cert = await Deno.readTextFile("./cert/public.pem");
  const privateKey = await Deno.readTextFile("./cert/private.pem");
  const client = Deno.createHttpClient({
    caCerts: [caCert],
    certChain: cert,
    privateKey: privateKey,
  });

  const id = crypto.randomUUID();
  const instructionId = id.replaceAll("-", "").toUpperCase();

  const encodedData = new TextEncoder().encode(JSON.stringify({
    id: instructionId,
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

  const data = {
    payeePaymentReference: params.reference,
    callbackUrl: `https://${DOMAIN}/hook/${hashHex}`,
    payeeAlias: PAYEE,
    currency: "SEK",
    payerAlias: params.payer,
    amount: params.amount,
    message: params.message,
  };

  const response = await fetch(
    `https://${SWISH_DOMAIN}/api/v2/paymentrequests/${instructionId}`,
    {
      client,
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    },
  );

  if (response.status === 201) {
    return { id: instructionId };
  }

  const error = await response.json();
  throw new Error(JSON.stringify(error));
}

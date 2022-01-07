import { DOMAIN, PAYEE } from "./secrets.ts";

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

  const data = {
    payeePaymentReference: params.reference,
    callbackUrl: `https://${DOMAIN}/hook/123`,
    payeeAlias: PAYEE,
    currency: "SEK",
    payerAlias: params.payer,
    amount: params.amount,
    message: params.message,
  };

  const instructionId = "29A86BE70EA346E4B1C39C874173F022";

  const response = await fetch(
    `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionId}`,
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

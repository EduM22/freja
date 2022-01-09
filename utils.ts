import { yup } from "./deps.ts";

export interface SwishCallbackResponse {
  id: string
  payeePaymentReference: string
  paymentReference: string
  callbackUrl: string
  payerAlias: string
  payeeAlias: string
  currency: string
  message: string
  errorMessage: string
  status: string
  amount: number
  dateCreated: string
  datePaid: string
  errorCode: string
}

export interface SwishRequest {
  reference: string,
  amount: string,
  message: string,
  payer: string,
}

export const swishSchema = yup.object({
  reference: yup.string().min(1).required(),
  amount: yup.string().min(1).required(),
  message: yup.string().min(1).required(),
  payer: yup.string().min(1).required(),
});

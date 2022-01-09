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
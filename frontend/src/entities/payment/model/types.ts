export interface Payment {
  id: string;
  merchant: string;
  amount: number;
  status: string;
  created_at: string;
}

export interface PaymentResponse {
  payments: Array<Payment>
}

export interface GetPaymentsParams {
  id?: string;
  status?: string;
  sort?: string;
}

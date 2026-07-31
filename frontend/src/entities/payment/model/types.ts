export enum PaymentStatus {
  COMPLETED = 'completed',
  PROCESSING = 'processing',
  FAILED = 'failed',
}

export interface Payment {
  id: string;
  merchant: string;
  amount: number;
  status: PaymentStatus;
  created_at: string;
}

export interface PaymentResponse {
  payments: Array<Payment>
}

export interface GetPaymentsParams {
  id?: string;
  status?: PaymentStatus | string;
  sort?: string;
}

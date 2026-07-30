import { apiClient } from '@/shared/api/axios';
import { cleanParams } from '@/shared/lib/utils';
import type { Payment, PaymentResponse, GetPaymentsParams } from '../model/types';

export async function fetchPayments(params?: GetPaymentsParams): Promise<Payment[]> {
  const reqParams = params ? cleanParams(params) : {};
  const response = await apiClient.get<PaymentResponse>('/dashboard/v1/payments', { params: reqParams });
  return response.data.payments;
}

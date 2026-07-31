import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchPayments } from '../api/payment';
import type { Payment, GetPaymentsParams } from './types';

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref<Payment[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  async function loadPayments(params?: GetPaymentsParams) {
    isLoading.value = true;
    error.value = null;
    try {
      payments.value = await fetchPayments(params);
    } catch (err: unknown) {
      const errMessage = err as Error;
      error.value = errMessage.message || 'Failed to fetch payments';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    payments,
    isLoading,
    error,
    loadPayments,
  };
});

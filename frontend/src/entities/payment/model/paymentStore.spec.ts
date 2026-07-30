import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePaymentStore } from './paymentStore';
import * as paymentApi from '../api/payment';

vi.mock('../api/payment', () => ({
  fetchPayments: vi.fn(),
}));

describe('paymentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    const store = usePaymentStore();
    expect(store.payments).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('should handle successful loadPayments', async () => {
    const mockPayments = [
      { id: '1', merchant: 'A', amount: 100, status: 'completed', created_at: '2026-07-31' }
    ];
    vi.mocked(paymentApi.fetchPayments).mockResolvedValueOnce(mockPayments);

    const store = usePaymentStore();
    
    const promise = store.loadPayments();
    
    expect(store.isLoading).toBe(true);
    expect(store.error).toBeNull();
    
    await promise;
    
    expect(store.isLoading).toBe(false);
    expect(store.payments).toEqual(mockPayments);
    expect(paymentApi.fetchPayments).toHaveBeenCalledTimes(1);
  });

  it('should handle failed loadPayments', async () => {
    const errorMsg = 'Network Error';
    vi.mocked(paymentApi.fetchPayments).mockRejectedValueOnce(new Error(errorMsg));

    const store = usePaymentStore();
    
    await store.loadPayments();
    
    expect(store.isLoading).toBe(false);
    expect(store.payments).toEqual([]);
    expect(store.error).toBe(errorMsg);
  });
});

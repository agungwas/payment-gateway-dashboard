import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPayments } from './payment';
import { apiClient } from '@/shared/api/axios';
import * as utils from '@/shared/lib/utils';

vi.mock('@/shared/api/axios', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

vi.mock('@/shared/lib/utils', () => ({
  cleanParams: vi.fn((p) => p),
}));

describe('paymentApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch payments with clean parameters', async () => {
    const mockRes = { data: { payments: [{ id: '1' }] } };
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockRes);

    const params = { status: 'completed' };
    const result = await fetchPayments(params);

    expect(utils.cleanParams).toHaveBeenCalledWith(params);
    expect(apiClient.get).toHaveBeenCalledWith('/dashboard/v1/payments', { params });
    expect(result).toEqual(mockRes.data.payments);
  });

  it('should fetch payments without params if not provided', async () => {
    const mockRes = { data: { payments: [] } };
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockRes);

    await fetchPayments();

    expect(utils.cleanParams).not.toHaveBeenCalled();
    expect(apiClient.get).toHaveBeenCalledWith('/dashboard/v1/payments', { params: {} });
  });
});

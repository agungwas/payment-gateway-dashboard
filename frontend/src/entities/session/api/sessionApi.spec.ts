import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login } from './sessionApi';
import { apiClient } from '@/shared/api/axios';

vi.mock('@/shared/api/axios', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

describe('sessionApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call apiClient.post with correct payload', async () => {
    const mockRes = { data: { token: 't', role: 'cs' } };
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockRes);

    const payload = { email: 'e', password: 'p' };
    const result = await login(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/dashboard/v1/auth/login', payload);
    expect(result).toEqual(mockRes.data);
  });
});

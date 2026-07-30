import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSessionStore } from './sessionStore';
import * as sessionApi from '../api/sessionApi';

vi.mock('../api/sessionApi', () => ({
  login: vi.fn(),
}));

describe('sessionStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should handle successful login', async () => {
    const mockRes = { token: 'fake-token', role: 'cs' };
    vi.mocked(sessionApi.login).mockResolvedValueOnce(mockRes);

    const store = useSessionStore();
    
    await store.loginUser({ email: 'test@example.com', password: 'password' });
    
    expect(store.token).toBe('fake-token');
    expect(store.role).toBe('cs');
    expect(store.isAuthenticated).toBe(true);
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(localStorage.getItem('role')).toBe('cs');
  });

  it('should clear state on failed login', async () => {
    vi.mocked(sessionApi.login).mockRejectedValueOnce(new Error('Invalid credentials'));

    const store = useSessionStore();
    
    await expect(store.loginUser({ email: 'test@example.com', password: 'wrong' }))
      .rejects.toThrow('Invalid credentials');
    
    expect(store.token).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });

  it('should clear state on logout', () => {
    const store = useSessionStore();
    store.token = 'fake-token';
    store.role = 'cs';
    localStorage.setItem('token', 'fake-token');
    
    store.logout();
    
    expect(store.token).toBeNull();
    expect(store.role).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });
});

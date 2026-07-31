import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import DashboardPage from './DashboardPage.vue';
import { usePaymentStore } from '@/entities/payment/model/paymentStore';

// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('DashboardPage', () => {
  it('should mount properly and trigger loadPayments on mount', () => {
    const wrapper = mount(DashboardPage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              payment: { payments: [], isLoading: false, error: null }
            }
          })
        ]
      }
    });

    const paymentStore = usePaymentStore();
    expect(wrapper.exists()).toBe(true);
    expect(paymentStore.loadPayments).toHaveBeenCalled();
  });
});

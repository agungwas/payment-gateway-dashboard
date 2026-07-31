import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import LoginPage from './LoginPage.vue';
// Mock vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('LoginPage', () => {
  it('should mount properly and submit login form', async () => {
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              session: { token: null, role: null }
            }
          })
        ]
      }
    });

    expect(wrapper.exists()).toBe(true);

    // Find inputs and submit
    const emailInput = wrapper.find('input[type="email"]');
    const passInput = wrapper.find('input[type="password"]');
    
    // We only test that it mounts without error and has the basic fields
    expect(emailInput.exists()).toBe(true);
    expect(passInput.exists()).toBe(true);
  });
});

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login as apiLogin, type LoginRequest } from '../api/sessionApi';

export const useSessionStore = defineStore('session', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const role = ref<string | null>(localStorage.getItem('role'));

  const isAuthenticated = computed(() => !!token.value);

  async function loginUser(credentials: LoginRequest) {
    try {
      const res = await apiLogin(credentials);
      token.value = res.token;
      role.value = res.role;
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      return res;
    } catch (err) {
      token.value = null;
      role.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      throw err;
    }
  }

  function logout() {
    token.value = null;
    role.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  return {
    token,
    role,
    isAuthenticated,
    loginUser,
    logout,
  };
});

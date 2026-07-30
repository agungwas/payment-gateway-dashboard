<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/features/auth/model/authStore';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

async function handleSubmit() {
  errorMessage.value = '';
  isLoading.value = true;
  try {
    await authStore.loginUser({
      email: email.value,
      password: password.value,
    });
    router.push('/dashboard');
  } catch (err: any) {
    errorMessage.value = err.message || 'Login failed';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div style="padding: 2rem; max-width: 400px; margin: 0 auto;">
    <h2>Login (Internal Monitoring)</h2>
    <form @submit.prevent="handleSubmit">
      <div style="margin-bottom: 1rem;">
        <label for="email">Email:</label><br />
        <input
          id="email"
          v-model="email"
          type="email"
          required
          style="width: 100%; padding: 0.5rem;"
        />
      </div>

      <div style="margin-bottom: 1rem;">
        <label for="password">Password:</label><br />
        <input
          id="password"
          v-model="password"
          type="password"
          required
          style="width: 100%; padding: 0.5rem;"
        />
      </div>

      <div v-if="errorMessage" style="color: red; margin-bottom: 1rem;">
        {{ errorMessage }}
      </div>

      <button type="submit" :disabled="isLoading" style="padding: 0.5rem 1rem;">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

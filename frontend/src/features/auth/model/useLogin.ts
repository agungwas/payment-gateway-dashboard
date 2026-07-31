import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/entities/session/model/sessionStore';

export function useLogin() {
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const isLoading = ref(false);

  const sessionStore = useSessionStore();
  const router = useRouter();

  async function handleSubmit() {
    errorMessage.value = '';
    isLoading.value = true;
    try {
      await sessionStore.loginUser({
        email: email.value,
        password: password.value,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as Error;
      errorMessage.value = error.message || 'Login failed';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    email,
    password,
    errorMessage,
    isLoading,
    handleSubmit,
  };
}

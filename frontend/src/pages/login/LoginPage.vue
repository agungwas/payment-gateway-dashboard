<script setup lang="ts">
import { UiButton, UiInput, UiCard, UiAlert } from '@/shared/ui';
import { useLogin } from '@/features/auth/model/useLogin';

const { email, password, errorMessage, isLoading, handleSubmit } = useLogin();
</script>

<template>
  <div class="auth-layout">
    <UiCard class="auth-card" :bordered="false">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your Durianpay dashboard</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <UiInput
          id="email"
          label="Email"
          v-model="email"
          type="email"
          placeholder="cs@test.com"
          size="large"
          required
        />

        <UiInput
          id="password"
          label="Password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          size="large"
          required
        />

        <UiAlert
          v-if="errorMessage"
          type="error"
          :message="errorMessage"
          show-icon
        />

        <UiButton
          type="primary"
          htmlType="submit"
          size="large"
          block
          :loading="isLoading"
        >
          Login
        </UiButton>
      </form>
    </UiCard>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f2f5 0%, #e6f7ff 100%);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  margin: 0;
  font-weight: 600;
}

.auth-header p {
  color: #666;
  margin-top: 4px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>

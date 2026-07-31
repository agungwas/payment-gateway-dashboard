<script setup lang="ts">
import { onMounted } from 'vue';
import { usePaymentStore } from '@/entities/payment/model/paymentStore';
import { UiAlert } from '@/shared/ui';
import DashboardHeader from './ui/DashboardHeader.vue';
import PaymentTable from './ui/PaymentTable.vue';

const paymentStore = usePaymentStore();

onMounted(() => {
  paymentStore.loadPayments();
});
</script>

<template>
  <div class="dashboard-layout">
    <DashboardHeader />
    
    <main class="dashboard-content">
      <UiAlert 
        v-if="paymentStore.error" 
        type="error" 
        :message="paymentStore.error" 
        show-icon 
        style="margin-bottom: 1rem;" 
      />
      
      <PaymentTable />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #f0f2f5;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '@/entities/payment/model/paymentStore';
import { useSessionStore } from '@/entities/session/model/sessionStore';

const paymentStore = usePaymentStore();
const sessionStore = useSessionStore();
const router = useRouter();
const statusFilter = ref('');
const idFilter = ref('');
const sortFilter = ref('');

onMounted(() => {
  paymentStore.loadPayments();
});

function applyFilter() {
  paymentStore.loadPayments({ 
    status: statusFilter.value,
    id: idFilter.value,
    sort: sortFilter.value
  });
}

function handleLogout() {
  sessionStore.logout();
  router.push('/login');
}
</script>

<template>
  <div style="padding: 24px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h2 style="margin: 0;">Payment Gateway Dashboard</h2>
      <button @click="handleLogout" style="color: red; padding: 6px 12px; cursor: pointer;">Logout</button>
    </div>
    
    <div style="margin-bottom: 16px; display: flex; gap: 16px; align-items: flex-end;">
      <div>
        <label for="status" style="display: block; margin-bottom: 4px;">Status</label>
        <select id="status" v-model="statusFilter">
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="processing">Processing</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div>
        <label for="id" style="display: block; margin-bottom: 4px;">ID</label>
        <input type="text" id="id" v-model="idFilter" placeholder="Filter by ID" />
      </div>

      <div>
        <label for="sort" style="display: block; margin-bottom: 4px;">Sort</label>
        <select id="sort" v-model="sortFilter">
          <option value="">Default</option>
          <option value="-created_at">Newest First</option>
          <option value="created_at">Oldest First</option>
          <option value="-amount">Amount (High to Low)</option>
          <option value="amount">Amount (Low to High)</option>
        </select>
      </div>

      <button @click="applyFilter">Apply Filter</button>
    </div>

    <div v-if="paymentStore.isLoading">Loading payments...</div>
    <div v-else-if="paymentStore.error" style="color: red;">Error: {{ paymentStore.error }}</div>
    
    <table v-else border="1" cellpadding="8" cellspacing="0" style="width: 100%; text-align: left;">
      <thead>
        <tr>
          <th>ID</th>
          <th>Merchant</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in paymentStore.payments" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.merchant }}</td>
          <td>{{ p.amount }}</td>
          <td>{{ p.status }}</td>
          <td>{{ p.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

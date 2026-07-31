<script setup lang="ts">
import { usePaymentStore } from '@/entities/payment/model/paymentStore';
import { PaymentStatus } from '@/entities/payment/model/types';
import { UiButton, UiInput, UiCard, UiTable } from '@/shared/ui';
import { Tag as ATag } from 'ant-design-vue'; 

import { reactive } from 'vue';
import type { TablePaginationConfig } from 'ant-design-vue';

const paymentStore = usePaymentStore();

const paginationState = reactive<TablePaginationConfig>({
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
});

const columns = [
  { 
    title: 'ID', 
    dataIndex: 'id', 
    key: 'id',
    customFilterDropdown: true,
  },
  { 
    title: 'Merchant', 
    dataIndex: 'merchant', 
    key: 'merchant' 
  },
  { 
    title: 'Amount (Rp)', 
    dataIndex: 'amount', 
    key: 'amount',
    sorter: true,
  },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    filters: [
      { text: 'Completed', value: PaymentStatus.COMPLETED },
      { text: 'Processing', value: PaymentStatus.PROCESSING },
      { text: 'Failed', value: PaymentStatus.FAILED },
    ],
    filterMultiple: false,
  },
  { 
    title: 'Created At', 
    dataIndex: 'created_at', 
    key: 'created_at',
    sorter: true,
  },
];

function handleTableChange(pagination: any, filters: Record<string, string[] | null>, sorter: { field?: string, order?: 'ascend' | 'descend' }) {
  if (pagination.current) paginationState.current = pagination.current;
  if (pagination.pageSize) paginationState.pageSize = pagination.pageSize;

  let status = '';
  if (filters.status && filters.status.length > 0) {
    status = filters.status[0];
  }

  let id = '';
  if (filters.id && filters.id.length > 0) {
    id = filters.id[0];
  }

  let sort = '';
  if (sorter.order && sorter.field) {
    sort = sorter.order === 'descend' ? `-${sorter.field}` : sorter.field;
  }

  paymentStore.loadPayments({ status, id, sort });
}

function getStatusColor(status: PaymentStatus | string) {
  switch (status) {
    case PaymentStatus.COMPLETED: return 'success';
    case PaymentStatus.PROCESSING: return 'processing';
    case PaymentStatus.FAILED: return 'error';
    default: return 'default';
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('id-ID');
}
</script>

<template>
  <UiCard class="table-card" :bordered="false" :bodyStyle="{ padding: '0 24px' }">
    <UiTable 
      :columns="columns" 
      :data-source="paymentStore.payments" 
      :loading="paymentStore.isLoading"
      rowKey="id"
      :pagination="paginationState"
      @change="handleTableChange"
    >
      <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters }">
        <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px; width: 200px;">
          <UiInput
            :model-value="selectedKeys[0] || ''"
            placeholder="Search ID"
            @change="(e: { target: { value: string; }; }) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="confirm()"
          />
          <div style="display: flex; gap: 8px;">
            <UiButton type="primary" size="small" block @click="confirm()">Search</UiButton>
            <UiButton size="small" block @click="() => { clearFilters(); confirm(); }">Reset</UiButton>
          </div>
        </div>
      </template>
      
      <template #customFilterIcon="{ filtered }">
        <span :style="{ color: filtered ? '#1890ff' : undefined }">🔍</span>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          <a-tag :color="getStatusColor(record.status)">
            {{ record.status.toUpperCase() }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'amount'">
          {{ formatCurrency(record.amount) }}
        </template>
        <template v-else-if="column.key === 'created_at'">
          {{ formatDate(record.created_at) }}
        </template>
      </template>
    </UiTable>
  </UiCard>
</template>

<style scoped>
.table-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
</style>

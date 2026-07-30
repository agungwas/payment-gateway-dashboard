<script setup lang="ts">
</script>

<template>
  <div style="padding: 24px;">
    <a-page-header
      title="Payment Gateway Dashboard"
      sub-title="Internal Monitoring System"
    />
    <a-row :gutter="16" style="margin-top: 16px;">
      <a-col :span="8">
        <a-card>
          <a-statistic title="Total Payments" :value="0" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic title="Successful" :value="0" value-style="color: #3f8600" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <a-statistic title="Failed" :value="0" value-style="color: #cf1322" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

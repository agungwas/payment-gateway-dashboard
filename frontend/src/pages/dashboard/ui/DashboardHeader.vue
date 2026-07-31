<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSessionStore } from '@/entities/session/model/sessionStore';
import { Dropdown as ADropdown, Menu as AMenu, MenuItem as AMenuItem, Avatar as AAvatar, MenuDivider as AMenuDivider } from 'ant-design-vue';

const sessionStore = useSessionStore();
const router = useRouter();

function handleLogout() {
  sessionStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="dashboard-header">
    <h2 class="title">Payment Gateway Dashboard</h2>
    
    <a-dropdown placement="bottomRight" :trigger="['click']">
      <a-avatar size="large" style="cursor: pointer; background-color: #000; color: #fff; font-weight: 600; border: 2px solid #e8e8e8;">
        {{ sessionStore.role ? sessionStore.role.charAt(0).toUpperCase() : 'U' }}
      </a-avatar>
      <template #overlay>
        <a-menu style="border-radius: 10px; padding: 6px; min-width: 180px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
          <a-menu-item key="info" disabled style="cursor: default; padding: 10px 14px;">
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span style="font-size: 0.75rem; color: #8c8c8c; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Current Role</span>
              <span style="font-size: 0.95rem; font-weight: 600; color: #1a1a1a; text-transform: capitalize;">{{ sessionStore.role || 'User' }}</span>
            </div>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout" @click="handleLogout" style="padding: 10px 14px; border-radius: 6px; transition: all 0.2s;">
            <span style="color: #ff4d4f; font-weight: 500;">Logout</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </header>
</template>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0 2rem;
  height: 64px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  position: relative;
  z-index: 10;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}
</style>

<script setup lang="ts">
import {useRouter} from "vue-router";
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const auth = useAuthStore();

const logout = async () => {
  auth.handleLogout()
  await router.push("/login")
}
</script>

<template>
  <div class="nav-bar">
    <div class="nav-left">
      <template v-if="auth.isAuthenticated">
        <router-link to="/cards"><button>All The Cards</button></router-link>
      </template>
    </div>

    <div class="nav-right">
      <template v-if="auth.isAuthenticated">
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login"><button>Login</button></router-link>
        <router-link to="/register"><button>Register</button></router-link>
      </template>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  margin: 24px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  background: var(--bg-panel);
  border: 4px solid var(--border-dark);
  box-shadow: 0 4px 0 var(--border-dark);
}


.nav-left,
.nav-right {
  display: flex;
  gap: 12px;
}

.nav-bar button {
  font-family: inherit;
  background: var(--secondary);
  color: white;
  border: 4px solid var(--border-dark);
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--border-dark);
}

.nav-bar button:hover {
  background: var(--primary);
  color: black;
}

</style>
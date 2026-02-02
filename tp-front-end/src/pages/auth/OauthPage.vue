<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store.ts";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

let code = route.query.code as string;
if (code) {
  auth.setCode(code);
}
if (!auth.isVerified) {
  auth.handleAuthorize();
} else {
  router.push("/");
}
</script>

<template>
  <div class="auth-page">
    <p class="loading">Authorizing...</p>
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  font-family: "Press Start 2P", monospace;
  font-size: 10px;
  color: #fff;
  background: linear-gradient(#4d7cff, #1a3c9f);
  border: 6px solid #000;
  box-shadow: 6px 6px 0 #000;
}

.loading {
  text-shadow: 2px 2px #000;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}
</style>

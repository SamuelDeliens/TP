<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar></NavBar>
  <suspense>
    <main>
      <router-view></router-view>
    </main>
  </suspense>
</template>

<style scoped>
main {
  padding-top: 100px;
}
</style>

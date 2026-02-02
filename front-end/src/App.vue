<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar></NavBar>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
main {
  padding-top: 100px;
}
</style>

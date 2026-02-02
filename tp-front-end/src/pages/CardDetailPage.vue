<script setup lang="ts">

import {ref} from "vue";
import type CardModel from "@/types/model/card.model.ts";
import {getCardDetail} from "@/services/card.service.ts";
import {useRoute} from "vue-router";
import router from "@/router.ts";

const route = useRoute()
const cardId = route.params.cardId

const card = ref<CardModel|null>(null);
try {
  if (typeof cardId === "string") {
    card.value = (await getCardDetail(cardId)).data;
  }
} catch (e) {
  router.back()
}

if (!card.value) {
  alert("no card found")
  router.back()
}

</script>

<template>
  <h1>CardDetailPage</h1>

  <div v-if="card">
    <h1>{{ card.name }}</h1>
    <img :src="card.imageUrl" :alt="card.name" />

    <div class="stats">
      <p>❤️ Health : {{ card.hp }}</p>
      <p>💥 Faiblesse : {{ card.weaknesses }}</p>
    </div>

    <div class="attacks">
      <template v-for="attack in card.attacks" :key="attack.name">
        <h3>{{ attack.name }} ({{ attack.damage }})</h3>
        <p>{{ attack.description }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
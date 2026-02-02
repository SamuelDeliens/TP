<script setup lang="ts">
import { ref } from "vue";
import type CardModel from "@/types/model/card.model.ts";
import {getCards} from "@/services/card.service.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const cards = ref<CardModel[]>([]);
cards.value = (await getCards()).data;

const openCard = async (cardId: string) => {
  await router.push(`/cards/${cardId}`);
};
</script>

<template>
  <h1>CardsPage</h1>

  <template v-if="cards.length > 0">
    <div class="cards">
      <div class="card" v-for="card in cards" :key="card.cardId" @click="openCard(card.cardId)">
        <p>{{ card.name }}</p>
      </div>
    </div>
  </template>
  <template v-else>
    <h3>No card</h3>
  </template>
</template>

<style scoped>

</style>
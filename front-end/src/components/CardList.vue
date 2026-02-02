<script setup lang="ts">
import Card from "@/components/Card.vue";
import type CardModel from "@/types/model/card.model.ts";

defineProps({
  cards: {
    type: Object as () => CardModel[],
    required: true
  }
});
</script>

<template>
  <template v-if="cards.length > 0">
    <div class="cards">
      <Card v-for="card in cards" :key="card.cardId" :card="card" />
    </div>
  </template>
  <template v-else>
    <h3>No card</h3>
  </template>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 24px;
  color: var(--secondary);
  text-shadow: 2px 2px 0 var(--border-dark);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

</style>
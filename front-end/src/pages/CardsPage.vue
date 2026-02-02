<script setup lang="ts">
import { ref } from "vue";
import type CardModel from "@/types/model/card.model.ts";
import {getCards} from "@/services/card.service.ts";
import CardList from "@/components/CardList.vue";

const cards = ref<CardModel[]>([]);
cards.value = (await getCards()).data;
</script>

<template>
  <h1>Card Page</h1>

  <CardList :cards="cards"/>
</template>

<style scoped>

</style>
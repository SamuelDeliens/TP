<script setup lang="ts">
import { ref } from "vue";
import {useAuthStore} from "@/stores/auth.store.ts";
import {getUserCards} from "@/services/user.service.ts";
import type CardModel from "@/types/model/card.model.ts";
import Card from "@/components/Card.vue";
import CardList from "@/components/CardList.vue";

const auth = useAuthStore();
const userId = auth.userId;

const cards = ref<CardModel[]>([]);
cards.value = (await getUserCards(userId)).data;

</script>

<template>
  <h1>My Cards Page</h1>
  <CardList :cards="cards"/>
</template>

<style scoped>

</style>
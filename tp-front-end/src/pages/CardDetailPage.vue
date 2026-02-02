<script setup lang="ts">
import {ref} from "vue";
import type CardModel from "@/types/model/card.model.ts";
import {useRoute, useRouter} from "vue-router";
import {getCardDetail} from "@/services/card.service.ts";
import CardDetail from "@/components/CardDetail.vue";

const router = useRouter();
const route = useRoute()
const cardId = route.params.cardId

const card = ref<CardModel | null>(null);
try {
  if (typeof cardId == "string") {
    card.value = (await getCardDetail(cardId)).data;
  }
} catch (error) {
  console.log(error)
}

if (!card.value) {
  alert("no card found")
  router.back()
}

</script>

<template>
  <CardDetail v-if="card" :card="card" />
</template>

<style scoped>
</style>
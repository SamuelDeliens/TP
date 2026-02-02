<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store.ts";
import { addGacha, performGachaPull } from "@/services/gacha.service.ts";
import type { GachaPullReturnType } from "@/types/api/gacha.api.ts";
import type CardModel from "@/types/model/card.model.ts";
import { getUserDetail } from "@/services/user.service.ts";
import type UserModel from "@/types/model/user.model.ts";
import Card from "@/components/Card.vue";

const auth = useAuthStore();
const userId = auth.userId;

const user = ref<UserModel | null>(null);
user.value = (await getUserDetail(userId)).data;

const card = ref<CardModel | null>(null);
const isPulling = ref(false);
const message = ref("Insère une pièce 🎮");

const gacha = async () => {
  if (isPulling.value || !user.value || user.value.availableGachaPulls <= 0) return;

  isPulling.value = true;
  card.value = null;
  message.value = "Invocation en cours...";

  try {
    await new Promise(r => setTimeout(r, 1000));
    const result: GachaPullReturnType = await performGachaPull(userId);

    card.value = result.data.obtainedCard;
    user.value = result.data.user;
    message.value = "✨ Carte obtenue !";
  } catch (error) {
    console.log(error);
    message.value = "Erreur du Gacha 😵";
  } finally {
    isPulling.value = false;
  }
};

const cheatGacha = async () => {
  user.value = (await addGacha(userId)).data;
};
</script>


<template>
  <div v-if="user" class="gacha-page">
    <div class="machine">
      <p class="message">{{ message }}</p>

      <button
          class="gacha-btn"
          @click="gacha"
          :disabled="isPulling || user.availableGachaPulls <= 0"
      >
        🎰 LANCER LE GACHA
      </button>

      <p class="counter">
        Tirages restants : {{ user.availableGachaPulls }}
      </p>
    </div>

    <div class="result" v-if="card">
      <Card :card="card" />
    </div>

    <button class="cheat" @click="cheatGacha">+1 Gacha (cheat)</button>
  </div>
</template>


<style scoped>
.gacha-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 24px;
}

/* 🎰 Machine */
.machine {
  text-align: center;
  padding: 16px;
  border: 6px solid var(--border-dark);
  background: linear-gradient(#fff, #eee);
  box-shadow: 6px 6px 0 var(--border-dark);
  width: 280px;
}

.message {
  font-size: 10px;
  margin-bottom: 12px;
}

/* 🔘 Bouton principal */
.gacha-btn {
  font-family: inherit;
  background: var(--primary);
  border: 4px solid var(--border-dark);
  padding: 12px;
  width: 100%;
  cursor: pointer;
  box-shadow: 4px 4px 0 var(--border-dark);
}

.gacha-btn:hover:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--border-dark);
}

.gacha-btn:disabled {
  background: #aaa;
  cursor: not-allowed;
  box-shadow: none;
}

/* 🎴 Résultat */
.result {
  max-width: 280px;
  animation: reveal 0.4s ease-out;
}

/* 🎉 Animation */
@keyframes reveal {
  0% { transform: scale(0.7); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* 🧪 Cheat */
.cheat {
  margin-top: 10px;
  font-size: 8px;
  background: #555;
  color: white;
  border: 3px solid var(--border-dark);
  padding: 6px 10px;
  cursor: pointer;
}

.counter {
  margin-top: 8px;
  font-size: 9px;
}
</style>

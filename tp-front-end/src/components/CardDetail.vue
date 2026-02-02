<script setup lang="ts">
const rarityClass = "";
</script>

<template>
  <div class="card-detail" :class="rarityClass">
    <div class="rarity-icon"></div>

    <h1><!--name--></h1>
    <img /> <!--img-->

    <div class="stats">
      <p>❤️ Health : <!--HP--></p>
      <p>💥 Faiblesse : <!--weakness--></p>
    </div>

    <div class="attacks">
      <template>
        <h3><!--name damage--></h3>
        <p><!--desc--></p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.card-detail {
  max-width: 360px;
  width: 100%;
  margin: 24px auto;
  padding: 14px;

  border: 8px solid var(--border-dark);
  box-shadow: 8px 8px 0 var(--border-dark);
  font-family: "Press Start 2P", monospace;
  position: relative;
}

h1 {
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
}

img {
  width: 100%;
  border: 6px solid var(--border-dark);
  margin-bottom: 12px;
  image-rendering: pixelated;
}

.stats p {
  font-size: 9px;
  margin: 4px 0;
}

.attacks {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 4px dashed var(--border-dark);
}

.attacks h3 {
  font-size: 10px;
  margin-bottom: 2px;
  color: var(--danger);
}

.attacks p {
  font-size: 9px;
}

/* 🎨 Rareté */
.rarity-common {
  background: linear-gradient(#f5deb3, #e4c08a);
}
.rarity-rare {
  background: linear-gradient(#f0f0f0, #c0c0c0);
}
.rarity-legendary {
  background: linear-gradient(#fff1a8, #ffd700);
}

/* ⭐ Icône */
.rarity-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background-size: cover;
}

.rarity-common .rarity-icon {
  background-image: url("../assets/diamant.png");
}
.rarity-rare .rarity-icon {
  background-image: url("../assets/etoile.png");
}
.rarity-legendary .rarity-icon {
  background-image: url("../assets/couronne.png");
}
</style>

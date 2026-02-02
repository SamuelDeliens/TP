<script setup lang="ts">
const openCard = async () => {
};

const rarityClass = "";
</script>

<template>
  <div class="card" :class="rarityClass" @click="openCard">
    <div class="rarity-icon"></div>

    <h1><!--name--></h1>
    <img /> <!--img-->

    <div class="attacks">
      <template>
        <h3><!--name damage--></h3>
        <p><!--desc--></p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 6px solid var(--border-dark);
  padding: 12px;
  cursor: pointer;
  box-shadow: 6px 6px 0 var(--border-dark);
  transition: transform 0.1s;
  position: relative;
  font-family: "Press Start 2P", monospace;
}

.card:hover {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0 var(--border-dark);
}

h1 {
  font-size: 12px;
  margin-bottom: 6px;
  text-align: center;
}

img {
  width: 100%;
  margin-bottom: 8px;
  border: 4px solid var(--border-dark);
  image-rendering: pixelated;
}

.attacks {
  margin-top: 8px;
  padding-top: 6px;
  border-top: 4px dashed var(--border-dark);
}

.attacks h3 {
  font-size: 9px;
  margin: 4px 0 2px;
  color: var(--danger);
}

.attacks p {
  font-size: 8px;
}

.rarity-common {
  background: #d1b592;
}
.rarity-rare {
  background: #c0c0c0;
}
.rarity-legendary {
  background: #ffd700;
}

.rarity-icon {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 16px;
  height: 16px;
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

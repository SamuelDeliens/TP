<script setup lang="ts">
async function signIn() {
}
</script>

<template>
  <div class="auth-page">
    <h1>Sign In</h1>
    <input type="text" placeholder="Username"/> <!--username-->
    <input type="password" placeholder="Password"/> <!--password-->
    <button>Sign in</button> <!--login-->
    <a>Don't have an account yet?</a> <!--to register-->
  </div>
</template>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: "Press Start 2P", monospace;
  background: linear-gradient(#f5f5f5, #dcdcdc);
  border: 6px solid #000;
  box-shadow: 6px 6px 0 #000;
  max-width: 320px;
  margin: 40px auto;
}

h1 {
  font-size: 12px;
  margin-bottom: 20px;
  color: #222;
}

input {
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 12px;
  border: 4px solid #000;
  box-shadow: 3px 3px 0 #000;
  font-family: "Press Start 2P", monospace;
  font-size: 10px;
  background: #fff;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  font-family: "Press Start 2P", monospace;
  font-size: 10px;
  background: #3b4cca;
  color: #fff;
  border: 4px solid #000;
  box-shadow: 3px 3px 0 #000;
  cursor: pointer;
}

button:hover {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #000;
}

a {
  font-size: 8px;
  text-decoration: none;
  color: #ffcb05;
  text-shadow: 1px 1px #000;
}
</style>

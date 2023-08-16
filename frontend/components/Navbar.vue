<template>
  <nav>
    <ul>
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/login">Login</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/register">Register</nuxt-link>
      </li>
      <li>
        <button @click="Logout">
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>

function Logout() {
  fetch('http://localhost:8080/api/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
}

</script>

<style lang="scss">
nav {
  position: absolute;
  top: 0;
  width: 100%;
  background-color: white;
  color: black;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 20%;

}
</style>
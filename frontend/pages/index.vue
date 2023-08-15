<template>
  <div class="container">
    <header>
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
    </header>
    <main>




      <form @submit.prevent="playOnline">
        <button>Play Online</button>
      </form>
      <form action="">
        <button>Play Offline</button>
      </form>
      <form>
        <button>Play Bot</button>
      </form>

    </main>
  </div>
</template>

<script setup lang="ts">


let pseudo = useState('pseudo', () => '')
const router = useRouter();

async function playOnline() {

  const res = await fetch('http://localhost:8080/api/room', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'pseudo': pseudo.value
    },
    credentials: 'include'
  });
  console.log("fetching room");

  if (res.status === 401) return navigateTo('/login')

  const jsonRes: any = await res.json();

  router.push(`/connect-four/online/${jsonRes.room}`)
}

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
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;


}

header {
  width: 100%;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 20%;

}

main {
  display: flex;
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

button {

  border: none;

  padding: 1rem;
  border-radius: 1rem;
  background-color: #f0f0f0;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }





}
</style>
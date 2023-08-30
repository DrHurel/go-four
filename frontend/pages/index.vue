<template>
  <div class="container">
    <Navbar />
    <main>
      <img src="/images/logo.svg" alt="logo">



      <form @submit.prevent="playOnline">
        <button>Play Online</button>
      </form>
      <form @submit.prevent="playOffline">
        <button>Play Offline</button>
      </form>
      <form>
        <button class="bot">Play Bot</button>
      </form>


      <NuxtLink to="/connect-four/rules"> <button class="rules">Rules</button></NuxtLink>
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

async function playOffline() {


  router.push(`/connect-four/offline`)
}



</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--dark-purple);
  align-items: center;
  justify-content: center;
}



main {
  background-color: var(--purple);
  display: flex;
  flex-direction: column;
  height: 50%;
  border-radius: 10%;
  border: 3px solid black;
  box-shadow: 0px 10px 0px 0px #000;
  aspect-ratio: 1.1/1;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

button {

  border: none;
  border-radius: 1.25rem;
  border: 3px solid var(--black, #000);
  background: var(--yellow, #FFCE67);
  box-shadow: 0px 10px 0px 0px #000;
  padding: 1rem;
  border-radius: 1rem;
  width: 85%;

  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }


  &.rules {
    background-color: white;
  }

  &.bot {
    background-color: var(--pink);
  }

}

form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

a {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
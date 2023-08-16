<template>
  <form @submit.prevent="submit">

    <input type="text" v-model="pseudo" />
    <input type="password" v-model="password" />

    <button>submit</button>

  </form>
</template>
<script setup lang="ts">

let pseudo = useState('pseudo', () => '')
let password = ref('')
const router = useRouter();

async function submit() {

  fetch('http://localhost:8080/api/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'pseudo': pseudo.value,
      'password': password.value
    },
    credentials: 'include'

  }).then(res => {
    console.log(res);
    if (res.status == 200) {
      router.push('/');
    }
  });



}

</script>

<style scoped lang="scss">
form {
  background-color: var(--purple);
  aspect-ratio: 1.1/1;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
</style>

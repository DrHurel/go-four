<template>
  <form @submit.prevent="submit">

    <input v-model="pseudo" type="text" required />
    <input v-model="password" type="password" required />
    <input v-model="verifPassword" type="password" required />

    <button>submit</button>

  </form>
</template>
<script setup lang="ts">

let pseudo = ref('')
let password = ref('')
let verifPassword = ref('')
const router = useRouter()

async function submit() {

  if (password.value != verifPassword.value) {
    console.log('passwords are not the same');
    return;
  }


  let res = await fetch('http://localhost:8080/api/register', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "pseudo": pseudo.value,
      "password": password.value

    },

  });


  if (res.status == 200) {
    console.log('register success');
    router.push('/login')
  } else {
    console.log('register failed');
  }

  console.log(res);

}

</script>
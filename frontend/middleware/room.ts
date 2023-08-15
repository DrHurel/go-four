export default defineNuxtRouteMiddleware(async (to, from) => {

  let pseudo = useState('pseudo', () => '')


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

  console.log(jsonRes);

  if (jsonRes.status === 'error') return abortNavigation()

  if (to.path == '/connect-four/online/waiting') return navigateTo('/connect-four/online/' + jsonRes.room)

})


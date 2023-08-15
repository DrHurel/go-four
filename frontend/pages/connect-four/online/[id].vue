<template>
  <header>

    <NuxtLink to="/">menu</NuxtLink>
    <div>decorator</div>
    <button @click="() => addToCollum({ a: cursor, b: player })">add to Row</button>
    <input id="cursor" type="number" min=0 max=6 step=1 v-model="cursor">
    <input id="player" type="range" min="-1" max="1" name="" step="2" v-model="player">
    <button>restart</button>
  </header>
  <main v-if="searchOpponent">loading</main>
  <main v-else>

    <section class="P1">
      <div class="player">player 1</div>
      <div class="score">{{
        score[0]
      }}</div>
    </section>
    <section class="board">
      <div class="cursor">
        <span :style="{
              transform: `translateX(calc(${cursor} * 100%))`
            }">
          <img v-bind:src="player == -1 ? '/images/marker-yellow.svg' : '/images/marker-red.svg'" />
        </span>
      </div>
      <img class="front-board" src="/images/board-layer-white-large.svg" alt="" />
      <div class="inner-board">
        <img v-for="(item, _) in  board " :class="{ clean: (item == 0) }"
          v-bind:src="(item == -1) ? '/images/counter-yellow-large.svg' : '/images/counter-red-large.svg'" />
      </div>
      <img class="back-board" src="/images/board-layer-black-large.svg" alt="" />
    </section>
    <section class=" P2">
      <div class="player">player 2</div>
      <div class="score">
        {{ score[1] }}
      </div>
    </section>


  </main>
  <footer>
    timer
  </footer>
</template>
<script setup lang="ts">



// pointers
const searchOpponent = ref(true);
const ws: { handler: null | WebSocket } = { handler: null }

const board = ref(new Array(42).fill(0));
const cursor = ref(0)
const player = useState("player", () => -1)
const score = useState('score', () => [0, 0]);
const canPlay = ref(true)
const route = useRoute();

// functions
const addToCollum = factoryADDTo({ board, player })
const callEvent = factoryCallEvent({ ws, cursor, canPlay, addToCollum, player })

onMounted(() => {

  ws.handler = new WebSocket('ws://localhost:8080/ws/' + route.params.id);


  if (typeof window != 'undefined') window.addEventListener("keydown", callEvent)

  ws.handler.onopen = () => {
    console.log('connected');
    ws.handler?.send('join room');
  };

  ws.handler.onmessage = factoryOnMessage({ board, searchOpponent, ws, canPlay, player, cursor, addToCollum })

  ws.handler.onclose = (e) => {
    console.log(e);
    console.log('disconnected');

    if (e.code == 26465) navigateTo('/')

    ws.handler = null
  };
});

onBeforeUnmount(
  async () => {
    if (typeof window != 'undefined') window.removeEventListener("keydown", callEvent)
    await ws.handler?.close()
    ws.handler = null

  }
)





</script>


<style lang="scss" scoped>
.front-board {

  z-index: 2;
  grid-row: 2/3;
  grid-column: 1/2;
  width: 100%;
}

.back-board {
  grid-row: 2/3;
  grid-column: 1/2;
  z-index: 0;

}

.board {
  width: 100%;
  height: 100%;


  display: grid;

  grid-template-columns: 1;
  grid-template-rows: 10% 1fr;

  border-radius: 1rem;

  .inner-board {

    grid-column: 1/2;
    //aspect-ratio: 1/1;
    grid-row: 2/3;
    margin: 0.9 1.1rem;
    margin-bottom: 4rem;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    align-items: center;
    justify-content: center;

    gap: 0 1rem;

    img {
      z-index: 1;
      object-position: 50% 50%;
      //width: 100%;


      transition: all 1s ease-in-out;




    }

    .clean {
      transform: translateY(-300px);
      opacity: 0;

    }

  }
}


header {
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 1rem;
  height: 5vh;
}

footer {
  width: 100%;
  height: 10vh;

}

.cursor {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  align-items: center;
  justify-content: center;

  span {

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.5s ease-in-out;

    img {

      width: fit-content;


    }
  }
}

main {
  display: flex;



  section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 1rem;
  }

}
</style>

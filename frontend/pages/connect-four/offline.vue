<template>
  <header class="flex center w-100">

    <div class="flex align-center jsb">
      <button @click="menu">Menu</button>
      <img src="/images/logo.svg" alt="logo">
      <button @click="newgame">restart</button>
    </div>
  </header>
  <main class="grid center w-100">

    <section class="flex column center">
      <div class="score-container flex column center">
        <img src="/images/player-one.svg" alt="p1">
        <p class="player">player 1</p>
        <p class="p-3-5rem">{{
          score[0]
        }}</p>
      </div>
    </section>
    <section class="board grid center h-100 w-100">
      <div class="cursor grid center w-100">
        <span :style="{
              transform: `translateX(calc(${cursor} * 100%))`
            }" class="flex center w-100">
          <img v-bind:src="player == Player.PLAYER2 ? '/images/marker-yellow.svg' : '/images/marker-red.svg'"
            alt="cursor" />
        </span>
      </div>
      <img class="front-board h-100 g-2-3" src="/images/board-layer-white-large.svg" alt="" />
      <div class="inner-board grid center g-2-3">
        <img class="square" v-for="(item, _) in  board " :class="{ clean: (item == Player.EMPTY) }"
          v-bind:src="(item == Player.PLAYER2) ? '/images/counter-yellow-large.svg' : '/images/counter-red-large.svg'" />
      </div>
      <img class="back-board h-100 g-2-3" src="/images/board-layer-black-large.svg" alt="" />

    </section>
    <section class="flex column center">
      <div class="score-container flex column center">
        <img src="/images/player-two.svg" alt="">
        <p class="player">player 2</p>
        <p class="p-3-5rem">{{
          score[1]
        }}</p>
      </div>
    </section>


  </main>
  <footer class="flex center w-100">
    <div class="grid center timer">

      <img class="g-1-2"
        v-bind:src="(player == Player.PLAYER2) ? '/images/turn-background-yellow.svg' : '/images/turn-background-red.svg'"
        alt="">

      <div class="flex center column g-1-2">
        <p>YOUR TURN</p>
        <p class="p-3-5rem">{{ timer }}s</p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">



// pointers

const board = ref(new Array(42).fill(Player.EMPTY)); // array of number representing the game board init at 0 when empty
const cursor = ref(0)
const player = ref(Player.PLAYER1)
const score = ref([0, 0]); //useState('score', () => [0, 0]);
const canPlay = ref(true)

const isPlaying = ref(false)
const router = useRouter()
const timer = ref(15)
const timerInterval = ref(15)

const interval = ref<NodeJS.Timer | undefined>()
// functions
const addToCollum = factoryADDTo({ board, player, timer, timerInterval })
const callEvent = factoryCallEventOffline({ cursor, addToCollum, player, canPlay, score, isPlaying })
const newgame = FactoryNewGameOffline({ board, player, canPlay, score })
const roundTimer = factoryRoundTimer({ timer, timerInterval, player, canPlay, score, isPlaying })

const menu = (e: any) => router.push('/') //to do

onMounted(() => {
  if (typeof window != 'undefined') window.addEventListener("keydown", callEvent)

  interval.value = setInterval(() => {
    roundTimer()
  }, 1000);

});

onBeforeUnmount(
  async () => {
    if (typeof window != 'undefined') window.removeEventListener("keydown", callEvent)

    clearInterval(interval.value)

  }
)





</script>


<style lang="scss" scoped>
.flex {
  display: flex;

  &.column {
    flex-direction: column;
  }

  &.jsb {
    justify-content: space-between;
  }
}

.align-center {
  align-items: center;
}

.grid {
  display: grid;
}

.g-2-3 {
  grid-row: 2/3;
  grid-column: 2/3;
}

.g-1-2 {
  grid-row: 1/2;
  grid-column: 1/2;
}



.center {
  align-items: center;
  justify-content: center;
}

.square {
  aspect-ratio: 1/1;
}

.h-100 {
  height: 100%;
}

.w-100 {
  width: 100%;
}

header {
  background-color: var(--purple);
  height: 8vh;

  div {

    height: fit-content;
    width: 39.5rem;

    button {
      background-color: var(--dark-purple);
      width: 5.375rem;
      height: 2.4375rem;
      flex-shrink: 0;
      color: white;
      border: none;
      border-radius: 1.25rem;
      padding: 0.25rem 1rem;
      z-index: 3;
      cursor: pointer;

      &:hover {
        background-color: var(--pink)
      }
    }
  }
}



.board {

  grid-template-columns: 1fr 39.5rem 1fr;
  grid-template-rows: 1fr 36.5rem 1fr;

  .front-board {
    z-index: 3;
  }

  .back-board {

    z-index: 1;
    transform: translateX(0.5rem) translateY(0.5rem);

  }

  .inner-board {
    width: calc(39.5rem - 2.5rem);
    height: calc(36.5rem - 3.75rem);
    padding: 1.25rem 1.25rem 3.5rem 1.25rem;
    z-index: 2;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    ;

    img {
      z-index: 1;
      width: 4rem;

      object-position: 50% 50%;
      object-fit: contain;
      transition: all 1s ease-in-out;

    }

    .clean {
      transform: translateY(-300px);
      opacity: 0;

    }

  }
}

.score-container {

  background-color: white;
  border-radius: 1.25rem;
  height: 10rem;
  width: 8.8125rem;
  border: 3px solid black;
  box-shadow: 0px 10px 0px 0px #000;

  img {
    position: absolute;
    transform: translateY(-5rem);
  }
}

p {
  margin: 0;
  padding: 0;
}

.player {
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.cursor {

  grid-template-columns: repeat(7, 1fr);
  grid-column: 2/3;

  span {
    transition: all 0.5s ease-in-out;

    img {
      width: fit-content;
    }
  }
}

main {
  grid-template-columns: 1fr 50% 1fr;
  height: 92vh;
  background-color: var(--purple);
}

footer {
  position: absolute;
  bottom: 0;
  height: 18vh;
  background-color: var(--dark-purple);
  border-radius: 3.75rem 3.75rem 0 0;

}

.timer {
  z-index: 3;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  img {
    width: 9.75rem;
  }

  div {
    color: white;

    p:first-child {
      font-size: 1rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
}

.p-3-5rem {
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>

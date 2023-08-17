<template>
  <Navbar />

  <main>

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
          <img v-bind:src="player == 1 ? '/images/marker-yellow.svg' : '/images/marker-red.svg'" />
        </span>
      </div>
      <img class="front-board" src="/images/board-layer-white-large.svg" alt="" />
      <div class="inner-board">
        <img v-for="(item, _) in  board " :class="{ clean: (item == 0) }"
          v-bind:src="(item == 1) ? '/images/counter-yellow-large.svg' : '/images/counter-red-large.svg'" />
      </div>
      <img class="back-board" src="/images/board-layer-black-large.svg" alt="" />
    </section>
    <section class="P2">
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

const board = ref(new Array(42).fill(0));
const cursor = ref(0)
const player = useState("player", () => -1)
const score = useState('score', () => [0, 0]);



// functions
const addToCollum = factoryADDTo({ board, player })
const callEvent = factoryCallEventOffline({ cursor, addToCollum, player })

onMounted(() => {
  if (typeof window != 'undefined') window.addEventListener("keydown", callEvent)
});

onBeforeUnmount(
  async () => {
    if (typeof window != 'undefined') window.removeEventListener("keydown", callEvent)


  }
)





</script>


<style lang="scss" scoped>
.board {
  width: 100%;
  height: 100%;

  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 39.5rem 1fr;

  grid-template-rows: 1fr 36.5rem 1fr;

  .front-board {

    z-index: 2;
    grid-row: 2/3;
    grid-column: 2/3;
    //width: 100%;
    height: 100%;
  }

  .back-board {
    grid-row: 2/3;
    grid-column: 2/3;
    z-index: 0;

    //width: 100%;
    height: 100%;

  }

  .inner-board {
    width: calc(39.5rem - 2.5rem);
    height: calc(36.5rem - 3.75rem);
    padding-bottom: 3.5rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    z-index: 1;
    grid-column: 2/3;
    grid-row: 2/3;

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    align-items: center;
    justify-content: center;


    img {
      z-index: 1;
      width: 4rem;
      aspect-ratio: 1/1;

      border: 1px solid green;
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



footer {
  width: 100%;
  height: 10vh;

}

.cursor {
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column: 2/3;
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
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 90vh;
  margin-top: 10vh;
  background-color: var(--purple);



}
</style>

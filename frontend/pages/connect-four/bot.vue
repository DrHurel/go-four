<script lang="ts" setup>


let board = useState('board', () => new Array(42).fill(0));
let cursor = ref(0)
let player = useState("player", () => -1)
let score = useState('score', () => [0, 0]);
let canPlay = ref(true)


async function addToCollum(a: number, b: number) {
  let row = 5;
  while (board.value[a + row * 7] != 0 && row > 0) {
    row--;
  }
  if (row == 0 && board.value[a + row * 7] != 0) {
    return;
  }


  board.value[a + row * 7] = parseInt((JSON.stringify(b)))
  canPlay.value = false
  setTimeout(
    () => {
      let test = isWinningMove(parseInt((JSON.stringify(b))), board, { x: row, y: a })
      if (test) {
        console.log("le joueur" + player.value + " a gagné " + test)
        console.log(a, row, board.value[a + row * 7])
        //alert("le joueur" + player.value + " a gagné " + test)
        return
      }
      player.value = -player.value
      canPlay.value = true
    },
    1000
  )



}

function callEvent(e: any) {

  if (e.code == 'ArrowRight') {
    if (cursor.value < 6) cursor.value++
    return
  }
  if (e.code == 'ArrowLeft') {
    if (cursor.value > 0) cursor.value--
    return
  }
  if (e.code == 'Space') {
    if (canPlay.value) addToCollum(cursor.value, player.value)
    return
  }

}


onMounted(() => {
  if (typeof window != 'undefined') window.addEventListener("keydown", callEvent)
})


onBeforeUnmount(() => { if (typeof window != 'undefined') window.removeEventListener("keydown", callEvent) })

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






<template >
  <header>

    <NuxtLink to="/">menu</NuxtLink>
    <div>decorator</div>
    <button @click="() => addToCollum(cursor, player)">add to Row</button>
    <input id="cursor" type="number" min=0 max=6 step=1 v-model="cursor">
    <input id="player" type="range" min="-1" max="1" name="" step="2" v-model="player">
    <button>restart</button>
  </header>
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
              //gridColumn: `${(cursor + 1)}/${(cursor + 2)}`
              transform: `translateX(calc(${cursor} * 100%))`
            }">
          <img v-bind:src="player == 1 ? '/images/marker-yellow.svg' : '/images/marker-red.svg'" />
        </span>
      </div>
      <img class="front-board" src="/images/board-layer-white-large.svg" alt="" />
      <div class="inner-board">
        <img v-for="(item, index) in  board " :class="{ clean: (item == 0) }"
          v-bind:src="(item == 1) ? '/images/counter-yellow-large.svg' : '/images/counter-red-large.svg'" />
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


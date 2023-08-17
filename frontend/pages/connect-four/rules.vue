<template>
  <div class="container">
    <Navbar />

    <main>

      <h1>Rules</h1>

      <section>
        <h2>OBJECTIVE</h2>
        <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or
          diagonally).</p>
      </section>
      <section>
        <h3>HOW TO PLAY</h3>
        <ol>
          <li>Red goes first in the first game.</li>
          <li>Players must alternate turns, and only one disc can be dropped in each turn. </li>
          <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
          <li>The starter of the previous game goes second on the next game.</li>
        </ol>

      </section>
      <button>check</button>
    </main>

  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: var(--purple);
  display: flex;
  justify-content: center;
  align-items: center;
}

main {

  background-color: white;
  border-radius: 10%;
  border: 3px solid black;
  box-shadow: 0px 10px 0px 0px #000;
  padding: 1rem;
  aspect-ratio: 1.1/1;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

}

h2 {
  color: var(--purple);
}

h3 {
  color: var(--purple);
}

ol {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0px;

  padding: 1rem;
  width: calc(100% - 1rem);
  height: fit-content;

}



button {
  background-color: var(--pink);
  border: 3px solid black;

  width: 4rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 0px 5px 0px 0px #000;
  color: white;
  transform: translateY(3rem);
  transition: all 0.5s ease-in-out;

  &:active {

    transform: translateY(calc(3rem + 5px));
    box-shadow: 0px 0px 0px 0px #000;

  }


}
</style>
export function factoryADDTo(board: globalThis.Ref<number[]>, canPlay: globalThis.Ref<boolean>, player: globalThis.Ref<number>) {


  return async (a: number, b: number) => {
    let row = 5;
    while (board.value[a + row * 7] != 0 && row > 0) {
      row--;
    }
    if (row == 0 && board.value[a + row * 7] != 0) {
      return;
    }


    board.value[a + row * 7] = parseInt((JSON.stringify(b)))

    setTimeout(
      () => {
        let test = isWinningMove(parseInt((JSON.stringify(b))), board, { x: row, y: a })
        if (test) {
          console.log("le joueur" + player.value + " a gagné " + test)
          console.log(a, row, board.value[a + row * 7])
          //alert("le joueur" + player.value + " a gagné " + test)
          return
        }

      },
      1000
    )



  }
}
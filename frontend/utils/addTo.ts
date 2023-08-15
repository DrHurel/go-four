
import { Factory } from "./type";
import { AddToOptions, optionRes } from "./interface";


/**
 * The `factoryADDTo` function takes in a board and a player, and returns an asynchronous function that
 * adds a value to the board at a specific position and checks if it results in a winning move.
 * @param board - The `board` parameter is a reference to an array of numbers representing the game
 * board. It is used to keep track of the state of the game.
 * @param player - The `player` parameter is a reference to a number that represents the current
 * player.
 * @returns an asynchronous function that takes two parameters (a and b) and performs some operations
 * on the board.
 */
export const factoryADDTo: Factory<AddToOptions, optionRes> = (options) => {

  const { board, player } = options;

  return (async (o: optionRes) => {

    const { a, b } = o;

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



  })
}
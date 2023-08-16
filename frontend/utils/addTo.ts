
import { Factory } from "./type";
import { AddToOptions, optionRes } from "./interface";



/**
 * This TypeScript function adds a value to a game board and checks if it results in a winning move.
 * @param options - An object containing the following properties:
 * - `board` - The game board.
 * - `player` - The player.
 * @returns a function that takes an object of type `optionRes` as an argument.
 */
export const factoryADDTo: Factory<AddToOptions, optionRes, boolean> = (options) => {

  const { board, player } = options;

  return ((o: optionRes) => {

    const { a, b } = o;

    let row = 5;
    while (board.value[a + row * 7] != 0 && row > 0) {
      row--;
    }

    if (row == 0 && board.value[a + row * 7] != 0) {

      return false
    }


    board.value[a + row * 7] = parseInt((JSON.stringify(b)))


    let test = isWinningMove(parseInt((JSON.stringify(b))), board, { x: row, y: a })
    if (test) {
      console.log("le joueur" + player.value + " a gagné " + test)
      console.log(a, row, board.value[a + row * 7])
    }



    return true

  })
}
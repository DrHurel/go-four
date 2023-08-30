
import { Factory } from "./type";
import { AddToOptions, optionRes } from "./interface";
import { PlayImpact } from "./enum";



/**
 * This TypeScript function adds a value to a game board and checks if it results in a winning move.
 * @param options - An object containing the following properties:
 * - `board` - The game board.
 * - `player` - The player.
 * @returns a function that takes an object of type `optionRes` as an argument.
 */
export const factoryADDTo: Factory<AddToOptions, optionRes, PlayImpact> = (options) => {

  const { board, player, timer, timerInterval } = options;

  return ((o) => {

    const { a, b } = o;

    if (board.value[a] != 0) {
      return PlayImpact.UNAUTHORIZED
    }


    let row = 5;
    while (board.value[a + row * 7] != 0 && row > 0) {
      row--;
    }


    timer.value = timerInterval.value
    board.value[a + row * 7] = parseInt((JSON.stringify(b)))


    const test = isWinningMove(parseInt((JSON.stringify(b))), board, { x: row, y: a })
    if (test) {
      console.log("le joueur" + player.value + " a gagné " + test)
      console.log(a, row, board.value[a + row * 7])
      return PlayImpact.WIN
    }



    return PlayImpact.NONE
  })
}
import { Direction } from "./enum"


/**
 * The function checks if a move is a winning move in a game by checking for a sequence of 4 dots of
 * the same type in a row, column, or diagonal.
 * @param {number} type - The type parameter represents the type of player making the move. It is a
 * number that can be used to differentiate between different players (e.g., player 1 and player 2).
 * @param board - The `board` parameter is an object with a property `value` which is an array of
 * numbers. This array represents the game board, where each number represents a cell on the board. The
 * `type` parameter is a number that represents the player's type (e.g., 1 for player
 * @param play - The `play` parameter represents the current move being made on the board. It is an
 * object with two properties: `x` and `y`, which represent the coordinates of the move on the board.
 * @returns a boolean value, either true or false.
 */
export function isWinningMove(type: number, board: { value: Array<number> }, play: { x: number, y: number }): boolean {

  for (let index = 0; index < 4; index++) {
    let count = 0
    let nextDot = checkNextDot(type, index, play, board)

    while (nextDot) {
      nextDot = checkNextDot(type, index, nextDot, board)
      count++
      if (count === 3) {
        return true
      }
    }
    nextDot = checkNextDot(type, index + 4, play, board)
    while (nextDot) {
      nextDot = checkNextDot(type, index + 4, nextDot, board)
      count++
      if (count === 3) {
        return true
      }
    }


  }

  return false
}


/**
 * The function `checkNextDot` checks the next dot in a given direction on a board and returns its
 * coordinates if it matches a specified type, or null if it does not.
 * @param {number} type - The `type` parameter represents the type of dot that we are checking for. It
 * is a number value.
 * @param {Direction} direction - The direction parameter is an enum type called Direction. It
 * represents the direction in which to check for the next dot. The possible values for Direction are
 * UP, DOWN, LEFT, RIGHT, UP_LEFT, UP_RIGHT, DOWN_LEFT, and DOWN_RIGHT.
 * @param dot - The `dot` parameter is an object with properties `x` and `y`, representing the
 * coordinates of a dot on the board.
 * @param board - The `board` parameter is an object with a property `value` which is an array of
 * numbers.
 * @returns The function `checkNextDot` returns either an object with `x` and `y` properties
 * representing the coordinates of the next dot, or `null` if there is no next dot in the specified
 * direction.
 */

function checkNextDot(type: number, direction: Direction, dot: { x: number, y: number }, board: { value: Array<number> }): ({ x: number, y: number } | null) {

  switch (direction) {
    case Direction.UP:
      return null
    case Direction.DOWN:
      if (dot.x === 5) {
        return null
      }
      return board.value[(dot.x + 1) * 7 + dot.y] === type ? { x: dot.x + 1, y: dot.y } : null
    case Direction.LEFT:
      if (dot.y === 0) {
        return null
      }
      return board.value[dot.x * 7 + dot.y - 1] === type ? { x: dot.x, y: dot.y - 1 } : null
    case Direction.RIGHT:
      if (dot.y === 6) {
        return null
      }
      return board.value[dot.x * 7 + dot.y + 1] === type ? { x: dot.x, y: dot.y + 1 } : null
    case Direction.UP_LEFT:
      if (dot.x === 0 || dot.y === 0) {
        return null
      }
      return board.value[(dot.x - 1) * 7 + dot.y - 1] === type ? { x: dot.x - 1, y: dot.y - 1 } : null
    case Direction.UP_RIGHT:
      if (dot.x === 0 || dot.y === 6) {
        return null
      }
      return board.value[(dot.x - 1) * 7 + dot.y + 1] === type ? { x: dot.x - 1, y: dot.y + 1 } : null
    case Direction.DOWN_LEFT:
      if (dot.x === 5 || dot.y === 0) {
        return null
      }
      return board.value[(dot.x + 1) * 7 + dot.y - 1] === type ? { x: dot.x + 1, y: dot.y - 1 } : null
    case Direction.DOWN_RIGHT:
      if (dot.x === 5 || dot.y === 6) {
        return null
      }
      return board.value[(dot.x + 1) * 7 + dot.y + 1] === type ? { x: dot.x + 1, y: dot.y + 1 } : null
  }


}
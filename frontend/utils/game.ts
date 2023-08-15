
/**
 *  Check if the move is winning the game
 * 
 * @param board 
 * @param play 
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

enum Direction {
  DOWN_LEFT,
  DOWN,
  DOWN_RIGHT,
  LEFT,
  UP_RIGHT,
  UP, //n'est pas utilisé
  UP_LEFT,
  RIGHT
}

/**
 * 
 * Check if the next dot in the direction is from the same player
 * If it is, return the dot
 * If not, return null
 * 
 * @param type 
 * @param direction 
 * @param dot 
 * @param board 
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
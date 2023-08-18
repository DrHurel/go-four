import { time } from "console"
import { Controls, Action } from "./enum"
import { CallEventOfflineOptions, CallEventOptions } from "./interface"
import { Factory } from "./type"


/**
 * The `factoryCallEvent` function is a factory function that returns a `callEvent` function, which
 * handles keyboard events for a game and sends corresponding actions to a WebSocket server.
 * @param options - The `options` parameter is an object that contains the following properties:
 * @param options.ws - The `ws` property is a WebSocket object.
 * @param options.cursor - The `cursor` property is a ref object that contains the current cursor position.
 * @param options.canPlay - The `canPlay` property is a ref object that contains the current state of the game.
 * @param options.addToCollum - The `addToCollum` property is a function that adds a new piece to the game board.
 * @param options.player - The `player` property is a ref object that contains the current player.
 * 
 * @returns The function `callEvent` is being returned.
 */
export const factoryCallEvent: Factory<CallEventOptions, any, void> = (options) => {

  const { ws, cursor, canPlay, addToCollum, player } = options

  return function callEvent(e) {
    if (canPlay.value) {

      if (e.code == Controls.RIGHT) {
        if (cursor.value < 6) cursor.value++
        ws.handler?.send(Action.RIGHT)
        return
      }
      if (e.code == Controls.LEFT) {
        if (cursor.value > 0) cursor.value--
        ws.handler?.send(Action.LEFT)
      }
      if (e.code == Controls.SPACE) {
        if (addToCollum({ a: cursor.value, b: player.value }) != PlayImpact.UNAUTHORIZED) {
          canPlay.value = false
          player.value = (player.value == Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1)
          ws.handler?.send(Action.SPACE)
        }
        return
      }
    }

  }


}


/**
 * The `factoryCallEventOffline` function takes in options and returns an event handler function that
 * updates the cursor and player values based on keyboard input.
 * @param options - An object containing the following properties:
 * @param options.cursor - The `cursor` property is a ref object that contains the current cursor position.
 * @param options.addToCollum - The `addToCollum` property is a function that adds a new piece to the game board.
 * @param options.player - The `player` property is a ref object that contains the current player.
 * 
 * @returns The function being returned is an event handler function.
 */
export const factoryCallEventOffline: Factory<CallEventOfflineOptions, any, void> = (options) => {

  const { cursor, addToCollum, player, canPlay, score, isPlaying } = options

  return (e) => {

    if (!canPlay.value) return

    if (e.code == Controls.RIGHT) {
      if (!isPlaying.value) isPlaying.value = true
      if (cursor.value < 6) cursor.value++

    }
    if (e.code == Controls.LEFT) {
      if (!isPlaying.value) isPlaying.value = true
      if (cursor.value > 0) cursor.value--
    }

    if (e.code == Controls.SPACE) {
      if (!isPlaying.value) isPlaying.value = true
      const play = addToCollum({ a: cursor.value, b: player.value })
      if (play == PlayImpact.NONE) {
        player.value = (player.value == Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1)
      }

      if (play == PlayImpact.WIN) {
        console.log("vous avez gagné")
        canPlay.value = false
        score.value[player.value == Player.PLAYER1 ? 0 : 1]++
        if (isPlaying.value) isPlaying.value = false
        setTimeout(() => {
          alert("vous avez gagné" + player.value)
        }, 1000)
      }

    }


  }

}
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
        if (canPlay.value) if (addToCollum({ a: cursor.value, b: player.value }) != PlayImpact.UNAUTHORIZED) {
          canPlay.value = false
          player.value = - player.value
          ws.handler?.send(Action.SPACE)
        }
        return
      }
    }

  }


}


export const factoryCallEventOffline: Factory<CallEventOfflineOptions, any, void> = (options) => {

  const { cursor, addToCollum, player } = options

  return function callEvent(e) {


    if (e.code == Controls.RIGHT) {
      if (cursor.value < 6) cursor.value++

      return
    }
    if (e.code == Controls.LEFT) {
      if (cursor.value > 0) cursor.value--
    }
    if (e.code == Controls.SPACE) {
      const play = addToCollum({ a: cursor.value, b: player.value })
      if (play != PlayImpact.UNAUTHORIZED) {
        player.value = - player.value
      }

      return
    }





  }

}
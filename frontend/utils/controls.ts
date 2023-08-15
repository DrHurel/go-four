import { Controls, Action } from "./enum"
import { CallEventOptions } from "./interface"
import { Factory } from "./type"


/**
 * The `factoryCallEvent` function is a factory function that returns a `callEvent` function, which
 * handles keyboard events for a game and sends corresponding actions to a WebSocket server.
 * @param options - The `options` parameter is an object that contains the following properties:
 * @returns The function `callEvent` is being returned.
 */
export const factoryCallEvent: Factory<CallEventOptions, any> = (options) => {

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
        if (canPlay.value) addToCollum({ a: cursor.value, b: player.value })
        canPlay.value = false
        player.value = - player.value
        ws.handler?.send(Action.SPACE)
        return
      }
    }

  }


}



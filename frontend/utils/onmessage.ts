import { Action } from "./enum";
import { OnMessageOptions } from "./interface";
import { Factory } from "./type";


/**
 * The `factoryOnMessage` function is a TypeScript factory function that returns an event listener
 * function for handling WebSocket messages in a game.
 * @param {OnMessageOptions} options - The `options` parameter is an object that contains the following properties:
 * @param {Ref<number>} options.player - The `player` property is a ref that contains the player number.
 * @param {Ref<boolean>} options.searchOpponent - The `searchOpponent` property is a ref that contains a boolean value that indicates whether the player is searching for an opponent.
 * @param {Ref<boolean>} options.canPlay - The `canPlay` property is a ref that contains a boolean value that indicates whether the player can play.
 * @param {Ref<number>} options.cursor - The `cursor` property is a ref that contains the cursor position.
 * @param {Ref<number[][]>} options.board - The `board` property is a ref that contains the board.
 * @param {WebSocketHandler} options.ws - The `ws` property is a WebSocketHandler object.
 * @param {Function} options.addToCollum - The `addToCollum` property is a function that takes an object as an argument and returns void.
 * 
 * @returns a callback function that takes an event object as an argument.
 */
export const factoryOnMessage: Factory<OnMessageOptions, { data: string; }, void> = (options) => {

  const { board, searchOpponent, ws, canPlay, player, cursor, addToCollum } = options

  return (e: { data: string; }) => {
    console.log(e.data);

    if (player.value === 0) {
      const data = JSON.parse(e.data)
      board.value = data.board
      player.value = data.player
      cursor.value = data.cursor
      canPlay.value = data.canPlay
      return
    }

    if (e.data === Action.JOIN_ROOM) {
      if (searchOpponent.value) {
        searchOpponent.value = false;
        ws.handler?.send(Action.START_GAME);
      } else {
        ws.handler?.send(Action.RECOVER_GAME);

      }

      return;
    }
    if (e.data === Action.ASK_FOR_GAME) {
      ws.handler?.send(JSON.stringify({ board: board.value, player: player.value, cursor: cursor.value, canPlay: !canPlay.value }))
    }

    if (e.data === Action.RECOVER_GAME) {
      searchOpponent.value = false;
      player.value = 0
      ws.handler?.send(Action.ASK_FOR_GAME);
      return;
    }
    if (e.data === Action.START_GAME) {

      searchOpponent.value = false;
      canPlay.value = false
      return;
    }

    if (e.data === Action.RIGHT) {
      if (cursor.value < 6) cursor.value++
      return
    }

    if (e.data === Action.LEFT) {
      if (cursor.value > 0) cursor.value--
      return
    }

    if (e.data === Action.SPACE) {
      addToCollum({ a: cursor.value, b: player.value })
      canPlay.value = !canPlay.value
      player.value = -player.value
      return
    }

    console.log(e.data);

  };


}


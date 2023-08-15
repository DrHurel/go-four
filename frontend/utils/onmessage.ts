import { Action } from "./enum";
import { Factory, FactoryReturn } from "./type";

interface OnMessageOptions {
  board: globalThis.Ref<Array<number>>;
  searchOpponent: globalThis.Ref<boolean>;
  ws: { handler: WebSocket | null };
  canPlay: globalThis.Ref<boolean>;
  player: globalThis.Ref<number>;
  cursor: globalThis.Ref<number>;
  addToCollum: (o: { a: number, b: number }) => void;
}


/**
 * The `factoryOnMessage` function is a TypeScript factory function that returns an event listener
 * function for handling WebSocket messages in a game.
 * @param options - The `options` parameter is an object that contains the following properties:
 * @returns a callback function that takes an event object as an argument.
 */
export const factoryOnMessage: Factory<OnMessageOptions, { data: string; }> = (options) => {

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


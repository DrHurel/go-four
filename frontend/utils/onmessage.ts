export function factoryOnMessage(board: globalThis.Ref<Array<number>>, searchOpponent: globalThis.Ref<boolean>, ws: { handler: WebSocket | null }, canPlay: globalThis.Ref<boolean>, player: globalThis.Ref<number>, cursor: globalThis.Ref<number>, addToCollum: (arg0: number, arg1: number) => void) {


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

    if (e.data === 'join room') {
      if (searchOpponent.value) {
        searchOpponent.value = false;
        ws.handler?.send('start game');
      } else {
        ws.handler?.send('recover game');
        ws.handler?.send(JSON.stringify({ board: board.value, player: player.value, cursor: cursor.value, canPlay: !canPlay.value }))
      }

      return;
    }
    if (e.data === 'recover game') {
      searchOpponent.value = false;
      player.value = 0
      return;
    }
    if (e.data === 'start game') {

      searchOpponent.value = false;
      canPlay.value = false
      return;
    }

    if (e.data === 'right') {
      if (cursor.value < 6) cursor.value++
      return
    }

    if (e.data === 'left') {
      if (cursor.value > 0) cursor.value--
      return
    }

    if (e.data === 'space') {
      addToCollum(cursor.value, player.value)
      canPlay.value = !canPlay.value
      player.value = -player.value
      return
    }

    console.log(e.data);

  };


}
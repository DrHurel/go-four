export function factoryCallEvent(ws: { handler: WebSocket | null }, cursor: globalThis.Ref<number>, canPlay: globalThis.Ref<boolean>, addToCollum: (arg0: number, arg1: any) => void, player: globalThis.Ref<number>): (e: any) => void {

  return function callEvent(e: any) {
    if (canPlay.value) {

      if (e.code == 'ArrowRight') {
        if (cursor.value < 6) cursor.value++
        ws.handler?.send('right')
        return
      }
      if (e.code == 'ArrowLeft') {
        if (cursor.value > 0) cursor.value--
        ws.handler?.send('left')
        return
      }
      if (e.code == 'Space') {
        if (canPlay.value) addToCollum(cursor.value, player.value)
        canPlay.value = false
        player.value = - player.value
        ws.handler?.send('space')
        return
      }
    }

  }


}
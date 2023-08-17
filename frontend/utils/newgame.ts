import { Player } from "./enum";
import { Factory } from "./type";

interface NewGameOfflineOptions {
  score: globalThis.Ref<number[]>
  player: globalThis.Ref<Player>
  board: globalThis.Ref<Array<number>>
  canPlay: globalThis.Ref<boolean>
}

export const FactoryNewGameOffline: Factory<NewGameOfflineOptions,MouseEvent, void> = (options) => {

  const { score, player, board, canPlay } = options

  return (_payload) => {

    player.value = (score.value[0] + score.value[1]) % 2 === 0 ? Player.PLAYER1 : Player.PLAYER2
    board.value = Array(42).fill(0)
    canPlay.value = true
  }

}
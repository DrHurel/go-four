import { Player } from "./enum";
import { NewGameOfflineOptions } from "./interface";
import { Factory } from "./type";


export const FactoryNewGameOffline: Factory<NewGameOfflineOptions, MouseEvent, void> = (options) => {

  const { score, player, board, canPlay } = options

  return (_payload) => {


    player.value = (score.value[0] + score.value[1]) % 2 === 0 ? Player.PLAYER1 : Player.PLAYER2
    board.value = Array(42).fill(Player.EMPTY)
    canPlay.value = true

  }

}
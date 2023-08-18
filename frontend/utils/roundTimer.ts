import { RoundTimerOptions } from "./interface"
import { Factory } from "./type"

export const factoryRoundTimer: Factory<RoundTimerOptions, void, void> = (options) => {

  const { timer, timerInterval, player, score, canPlay, isPlaying } = options


  return () => {

    if (isPlaying.value && canPlay.value) {
      timer.value--


      if (timer.value == 0) {
        timer.value = timerInterval.value
        score.value[player.value == Player.PLAYER1 ? 1 : 0]++
        canPlay.value = false
        alert("vous avez perdu")
      }
    }

  }


}
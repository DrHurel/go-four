import { RoundTimerOptions } from "./interface"
import { Factory } from "./type"

export const factoryRoundTimer: Factory<RoundTimerOptions, void, void> = (options) => {

  const { timer, timerInterval, player, } = options


  return () => {

    timer.value++

    if (timer.value > timerInterval.value) {
      timer.value = 0
      alert("You lost" + player.value)
    }


  }


}
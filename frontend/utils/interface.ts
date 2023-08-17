import { PlayImpact } from "./enum";

export interface AddToOptions {
  board: globalThis.Ref<number[]>;
  player: globalThis.Ref<number>;

}

export interface optionRes { a: number, b: number }


export interface CallEventOptions extends CallEventOfflineOptions {
  ws: { handler: WebSocket | null }

}

export interface CallEventOfflineOptions {
  cursor: globalThis.Ref<number>
  addToCollum: (o: optionRes) => PlayImpact | Promise<PlayImpact>
  player: globalThis.Ref<number>
  canPlay: globalThis.Ref<boolean>
  score: globalThis.Ref<number[]>

}

export interface OnMessageOptions extends CallEventOptions {
  board: globalThis.Ref<Array<number>>;
  searchOpponent: globalThis.Ref<boolean>;

}



export interface RoundTimerOptions {
  timer: globalThis.Ref<number>;
  timerInterval: globalThis.Ref<number>;
  player: globalThis.Ref<number>
}

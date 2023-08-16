import { promises } from "dns";
import { PlayImpact } from "./enum";

export interface AddToOptions {
  board: globalThis.Ref<number[]>;
  player: globalThis.Ref<number>;
}

export interface optionRes { a: number, b: number }


export interface CallEventOptions {
  ws: { handler: WebSocket | null }
  cursor: globalThis.Ref<number>
  canPlay: globalThis.Ref<boolean>
  addToCollum: (o: optionRes) => PlayImpact | Promise<PlayImpact>
  player: globalThis.Ref<number>

}

export interface CallEventOfflineOptions {
  cursor: globalThis.Ref<number>
  addToCollum: (o: optionRes) => PlayImpact | Promise<PlayImpact>
  player: globalThis.Ref<number>

}

export interface OnMessageOptions {
  board: globalThis.Ref<Array<number>>;
  searchOpponent: globalThis.Ref<boolean>;
  ws: { handler: WebSocket | null };
  canPlay: globalThis.Ref<boolean>;
  player: globalThis.Ref<number>;
  cursor: globalThis.Ref<number>;
  addToCollum: (o: { a: number, b: number }) => void;
}


export enum Action {
  JOIN_ROOM = 'join room',
  ASK_FOR_GAME = 'ask for game',
  RECOVER_GAME = 'recover game',
  START_GAME = 'start game',
  RIGHT = 'right',
  LEFT = 'left',
  SPACE = 'space',
  GAME_OVER = 'game over',
  WIN = 'win',
}

export enum Controls {
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft',
  SPACE = 'Space'
}

export enum Direction {
  DOWN_LEFT,
  DOWN,
  DOWN_RIGHT,
  LEFT,
  UP_RIGHT,
  UP, //n'est pas utilisé
  UP_LEFT,
  RIGHT
}

export enum PlayImpact {
  WIN,
  NONE,
  UNAUTHORIZED
}

export enum Player {
  PLAYER1 = 1,
  PLAYER2 = -1,
}
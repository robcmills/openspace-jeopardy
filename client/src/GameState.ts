export enum GameState {
  Lobby = 'lobby',
  Video = 'video',
  Jeopardy = 'jeopardy',
  DoubleJeopardy = 'doubleJeopardy',
  FinalJeopardy = 'finalJeopardy',
}

export const GAME_STATE_PATHS = {
  [GameState.Lobby]: 'lobby',
  [GameState.Video]: 'video',
  [GameState.Jeopardy]: 'jeopardy',
  [GameState.DoubleJeopardy]: 'doubleJeopardy',
  [GameState.FinalJeopardy]: 'finalJeopardy',
}

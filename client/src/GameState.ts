export enum GameState {
  Intro,
  Logo,
  Jeopardy,
  DoubleJeopardy,
  FinalJeopardy,
}

export const GAME_STATE_PATHS = {
  [GameState.Intro]: 'intro',
  [GameState.Logo]: 'logo',
  [GameState.Jeopardy]: 'jeopardy',
  [GameState.DoubleJeopardy]: 'doubleJeopardy',
  [GameState.FinalJeopardy]: 'finalJeopardy',
}

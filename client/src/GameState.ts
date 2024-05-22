export enum GameState {
  Intro = 'intro',
  Logo = 'logo',
  Jeopardy = 'jeopardy',
  DoubleJeopardy = 'doubleJeopardy',
  FinalJeopardy = 'finalJeopardy',
}

export const GAME_STATE_PATHS = {
  [GameState.Intro]: 'intro',
  [GameState.Logo]: 'logo',
  [GameState.Jeopardy]: 'jeopardy',
  [GameState.DoubleJeopardy]: 'doubleJeopardy',
  [GameState.FinalJeopardy]: 'finalJeopardy',
}

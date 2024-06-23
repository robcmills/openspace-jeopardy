export type TileState = {
  step: 'logo' | 'money' | 'answer' | 'dailyDouble' | 'blank'
  isDailyDouble: boolean
  answer: string
}

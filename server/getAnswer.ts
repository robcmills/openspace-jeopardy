type EnvKeyArgs = {
  column: number
  isDailyDouble: number
  round: number
  row: number
}

const envKey = ({ column, row, round, isDailyDouble }: EnvKeyArgs) =>
  `${round}_${column}_${row}_${isDailyDouble}`

type GetAnswerArgs = {
  column: number
  round: number
  row: number
}

export function getAnswer({ column, round, row }: GetAnswerArgs) {
  let key = envKey({ column, row, round, isDailyDouble: 0 })
  let envVar = process.env[key]
  if (envVar) {
    return { answer: envVar, isDailyDouble: false }
  }
  key = envKey({ column, row, round, isDailyDouble: 1 })
  envVar = process.env[key]
  if (envVar) {
    return { answer: envVar, isDailyDouble: true }
  }
  console.error(`No answer found for ${round}, ${column}, ${row}`)
  return null
}

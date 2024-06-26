type GetCategoryArgs = {
  column: number
  round: number
}

export function getCategory({ column, round }: GetCategoryArgs) {
  let key = `${round}_${column}`
  let envVar = process.env[key]
  if (envVar) {
    return envVar
  }
  console.error(`No category found for ${round}, ${column}`)
  return ''
}

export const getPluralOrSingular = (data: number) => {
  if (data > 1) return 's'
  return ''
}

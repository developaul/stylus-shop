export const format = (value: number) => {
  const formatter = new Intl
    .NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return formatter.format(value)
}
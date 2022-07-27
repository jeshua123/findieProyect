const locale = 'en'
const options = { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 }

export const formatNum = (num: number) => {
  return Intl.NumberFormat(locale, options).format(num)
}
// 12345.6789 --> "£12,345.68

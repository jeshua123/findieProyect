import { evaluate } from 'decimal-eval'

//Regexs
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/

//Mehods
export const taxCalculator = (price: number, taxPercentaje: number, calculateType?: 'without_tax') => {
  const tax = price * (taxPercentaje / 100)

  return calculateType === 'without_tax' ? price - tax : price + tax
}

export const formatDecimal = (number: number | undefined) => {
  return new Intl.NumberFormat().format(Math.ceil(number ?? 0))
}

export const loadFile = (files: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      return resolve(reader.result)
    })
    reader.readAsDataURL(files.item(0))
  })
}

export const loadFiles = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      return resolve(reader.result)
    })
    reader.readAsDataURL(file)
  })
}

export const setFormTheme = (selectedTheme?: string) => {
  const theme: Record<string, any> = {
    blue: {
      containerBgColor: 'bg-sea-blue',
      buttonBgColor: 'bg-soft-blue',
      textColor: 'text-white',
      borderBottom: 'border-b border-white',
    },
    orange: {
      containerBgColor: 'bg-soft-orange',
      buttonBgColor: 'bg-orange',
      textColor: 'text-black',
      borderBottom: 'border-b border-black',
    },
  }

  if (!selectedTheme) return theme.blue
  return theme[selectedTheme]
}

export const sortByString = (a: any, b: any, field: string) => {
  const aTostring = a[field].toLowerCase()
  const bTostring = b[field].toLowerCase()

  if (aTostring < bTostring) {
    return -1
  }
  if (aTostring > bTostring) {
    return 1
  }
  return 0
}

export const getFirstWord = (text: string) => {
  const endSLide = text.indexOf(' ')
  return endSLide > 0 ? text.slice(0, endSLide + 1) : text
}

export const uniqueKey = () => Math.round(Math.random() * (1000000 - 1) + 1).toString()

export const operation = (numner1: any, operator: string, number2: any) => {
  return +evaluate(`${numner1} ${operator} ${number2}`)
}

export const parseVideoUrl = (url: string) => {
  console.log(url.includes('youtu'))
  if (!url.includes('youtu')) return url
  const id = url.slice(17, url.length)
  return `https://www.youtube.com/embed/${id}`
}

export const cleanCLP = (value?: string | number | null) => {
  if (!value) return 0

  value = typeof value === 'number' ? String(value) : value
  return parseFloat(value.replace(/[.]/g, '').replace(/[,]/g, '.'))
}

export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

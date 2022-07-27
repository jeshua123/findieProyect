export const billingPlan = [
  'Default: 100% entrega',
  '50% al inicio / 50% entrega',
  '25% al inicio / 75% entrega',
  '25% al inicio / 25% mitad del proyecto / 50% entrega',
]

export const meetingsDays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie']

export const paymentMethod = [
  { method: 'Transferencia bancaria', fee: 0 },
  { method: 'Tarjeta de crédito', fee: 0 },
  { method: 'Paypal', fee: 3.42 },
  { method: 'MercadoPago', fee: 2.75 },
]

export const siiTaxes = [
  { name: 'Factura', tax: 19 },
  { name: 'No afecto', tax: 0 },
]

export const freelancerTaxes = [
  { name: 'Factura', value: 'bill' },
  { name: 'Boleta', value: 'ticket' },
]

export const budgetList = [
  { value: 'Micro proyecto (7.000 - 25.000) CLP', label: 'Micro proyecto (7.000 - 25.000) CLP' },
  { value: 'Proyecto simple (25.000 – 180.000 CLP)', label: 'Proyecto simple (25.000 – 180.000 CLP)' },
  { value: 'Proyecto muy pequeño (180.000 – 500.000 CLP)', label: 'Proyecto muy pequeño (180.000 – 500.000 CLP)' },
  { value: 'Proyecto pequeño (500.000 – 1.000.000 CLP)', label: 'Proyecto pequeño (500.000 – 1.000.000 CLP)' },
  { value: 'Proyecto medio (1.000.000 – 2.150.000 CLP) ', label: 'Proyecto medio (1.000.000 – 2.150.000 CLP) ' },
  { value: 'Proyecto grande (2.150.000 – 3.500.000 CLP o +)', label: 'Proyecto grande (2.150.000 – 3.500.000 CLP o +)' },
  { value: 'Proyecto más grande (3.500.000 – 7.000.000 CLP o +)', label: 'Proyecto más grande (3.500.000 – 7.000.000 CLP o +)' },
  { value: 'Lo voy a decidir después', label: 'Lo voy a decidir después' },
]

export const industryOptions = [
  { value: 'Agropecuario - silvícola', label: 'Agropecuario - silvícola' },
  { value: 'Pesca', label: 'Pesca' },
  { value: 'Minería', label: 'Minería' },
  { value: 'Industria Manufacturera', label: 'Industria Manufacturera' },
  { value: 'Alimentos', label: 'Alimentos' },
  { value: 'Electricidad, gas y agua', label: 'Electricidad, gas y agua' },
  { value: 'Construcción', label: 'Construcción' },
  { value: 'Comercio', label: 'Comercio' },
  { value: 'Restaurantes y hoteles', label: 'Restaurantes y hoteles' },
  { value: 'Transportes', label: 'Transportes' },
  { value: 'Comunicaciones', label: 'Comunicaciones' },
  { value: 'Financieros y empresariales', label: 'Financieros y empresariales' },
  { value: 'Vivienda e inmobiliarios', label: 'Vivienda e inmobiliarios' },
  { value: 'Educación', label: 'Educación' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Administración pública', label: 'Administración pública' },
  { value: 'Otro', label: 'Otro' },
]

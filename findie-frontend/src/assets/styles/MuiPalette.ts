import { createTheme } from '@material-ui/core'
import './base/_root.scss'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    primary: PaletteColor
    black: string
    black02: string
    black008: string
    black005: string
    darkOrange: string
    orange: string
    softOrange: string
    lightOrange: string
    lightOrange2: string
    yellow: string
    strongRose: string
    rose: string
    red: string
    lightBlue: string
    iceBlue: string
    blue: string
    blue005: string
    seaBlue: string
    softBlue: string
    skyBlue: string
    skyBlue03: string
    softGreen: string
    gray: string
    gray05: string
    white: string
  }
  interface PaletteOptions {
    black?: string
    black02?: string
    black008?: string
    black005?: string
    darkOrange?: string
    orange?: string
    softOrange?: string
    lightOrange?: string
    lightOrange2?: string
    yellow?: string
    strongRose?: string
    rose?: string
    red?: string
    iceBlue: string
    lightBlue: string
    blue: string
    blue005: string
    seaBlue?: string
    softBlue: string
    skyBlue?: string
    skyBlue03?: string
    softGreen?: string
    gray?: string
    gray05?: string
    white?: string
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    black: 'var(--black)',
    black02: 'var(--black-02)',
    black008: 'var(--black-008)',
    black005: 'var(--black-005)',
    darkOrange: 'var(--dark-orange)',
    orange: 'var(--orange)',
    softOrange: 'var(--soft-orange)',
    lightOrange: 'var(--light-orange)',
    lightOrange2: 'var(--light-orange2)',
    yellow: 'var(--yellow)',
    strongRose: 'var(--strong-rose)',
    rose: 'var(--rose)',
    red: 'var(--red)',
    iceBlue: 'var(--ice-blue)',
    lightBlue: 'var(--light-blue)',
    blue: 'var(--blue)',
    blue005: 'var(--blue-005)',
    seaBlue: 'var(--sea-blue)',
    softBlue: 'var(--soft-blue)',
    skyBlue: 'var(--sky-blue)',
    skyBlue03: 'var(--sky-blue-03)',
    softGreen: 'var(--soft-green)',
    gray: 'var(--gray)',
    gray05: 'var(--gray-05)',
    white: 'var(--white)',
  },
})

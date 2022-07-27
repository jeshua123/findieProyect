import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { SnackbarProvider } from 'notistack'
import { LoaderContextProvider } from './context/LoaderContext'

import AppRouter from './appRouter/AppRouter'

import './assets/styles/index.scss'
import { theme } from './assets/styles/MuiPalette'
import { ThemeProvider } from '@material-ui/styles'
import { AuthContextProvider } from './context/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoaderContextProvider>
          <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
              <SnackbarProvider maxSnack={3}>
                <AppRouter />
              </SnackbarProvider>
            </QueryClientProvider>
          </AuthContextProvider>
        </LoaderContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

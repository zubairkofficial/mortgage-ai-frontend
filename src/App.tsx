import React, { Suspense } from 'react'
import './App.css'
import AppRouter from './routes'
import { ThemeProvider } from './components/theme/theme-provider'

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider>
          <AppRouter />
        </ThemeProvider>
      </Suspense>
    </React.Fragment>
  )
}

export default App

import React, { Suspense } from 'react'
import './App.css'
import AppRouter from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider>
          <AppRouter />
          <Toaster />
        </ThemeProvider>
      </Suspense>
    </React.Fragment>
  )
}

export default App

import React, { Suspense } from 'react'
import './App.css'
import AppRouter from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from './contexts/auth-context'

function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider>
          <AuthProvider>
            <AppRouter />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </Suspense>
    </React.Fragment>
  )
}

export default App

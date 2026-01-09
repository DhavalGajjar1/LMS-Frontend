import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './pages/routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { CourseProvider } from './context/CourseContext'

function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <AppRoutes />
        </CourseProvider>
      </AuthProvider>

    </BrowserRouter>

  )
}

export default App

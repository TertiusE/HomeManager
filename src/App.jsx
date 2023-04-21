import { useState } from 'react'
import './login/LoginPage'
import { LoginPage } from './login/LoginPage'
import { RegisterPage } from './register/RegisterPage'
import { ErrorPage } from './error/ErrorPage'
import { BrowserRouter, Routes, Route, useNavigate,redirect } from 'react-router-dom'
import { HomeManager } from './homeManager/HomeManager'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      redirect('/home')
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomeManager />} />
        <Route path='*' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;

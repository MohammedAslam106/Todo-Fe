import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { AuthProvider } from '../context/authContext.jsx'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'
import Signin from './components/signin.jsx'
import Signup from './components/signup.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<ProtectedRoute/>}>
            <Route  path='/' element={<App/>}/>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)

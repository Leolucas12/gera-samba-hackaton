import  'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css'
import Register from './pages/register/register' ;

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getTemplates } from './services'

function App() {

  useEffect(() => {
    const subscriber = async () => {
      const result = await getTemplates();
      console.log(result)  
    }
    
    subscriber()
  }, [])

  return (
    <>
      <Register/>
    </>
  )
}

export default App

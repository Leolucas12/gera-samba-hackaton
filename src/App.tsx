
import './App.css'
import  'bootstrap/dist/css/bootstrap.min.css' ;
import Register from './pages/register/register' ;
import { useEffect} from 'react'
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

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createTemplate, CreateTemplateProps, getTemplates } from './services'

function App() {
  const [count, setCount] = useState(0)

  const _getTemplates = async () => {
    const response = await getTemplates();
    console.log(response)
  }

  const _createTemplates = async (content: string, name: string) => {
    const input: CreateTemplateProps = {
      content: content,
      variables: {
        "name": name
      }
    }
    const response = await createTemplate(input);
    console.log(response)
  }

  useEffect(() => {
    // _getTemplates();
    // _createTemplates("Bora bill!", "Teste");
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

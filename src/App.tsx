import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createConversation, CreateConversationProps, createTemplate, CreateTemplateProps, getTemplates, createInteractionConversation } from './services'

function App() {
  const [count, setCount] = useState(0)

  const _getTemplates = async () => {
    const response = await getTemplates();
    console.log(response)
  }

  const _createTemplates = async (content: string) => {
    const input: CreateTemplateProps = {
      content: content,
      variables: {
        "name": "string"
      }
    }
    const response = await createTemplate(input);
    console.log(response)
  }

  const _createConversation = async (variables: Record<string, string>, prompt_id: string) => {
    const input: CreateConversationProps = {
      temperature: 0.7,
      variables: variables,
      prompt_id: prompt_id
    }
    const response = await createConversation(input);
    console.log(response)
  }

  const _createInteractionConversation = async (conversation_id: string, message: string) => {
    const response = await createInteractionConversation(conversation_id, message)
    console.log(response)
  }

  useEffect(() => {
    // _getTemplates();
    // _createTemplates("Bora bill!");
    // _createConversation({ "name": "All" }, "625c9785-0ce1-435d-b7b3-a08aeea11cf8");
    // _createInteractionConversation("6da11d25-5331-4870-9c75-95d846f22fe0", "Olá");;
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


// {
//   "content": "Bora bill!",
//     "variables": {
//     "name": "string"
//   },
//   "id": "625c9785-0ce1-435d-b7b3-a08aeea11cf8"
// }


// "After cretae conversation":
// {
//   "id": "6da11d25-5331-4870-9c75-95d846f22fe0"
// }
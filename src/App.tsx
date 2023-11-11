import { useState } from 'react'
import './App.css'
import { createTemplate, getTemplates, interactionConversation } from './services'
import { getSessionKey } from './LocalStorage'
import { Template } from './types'

type Messages = {
  from: string;
  message: string
}

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);
  
  const [templates, setTemplates] = useState<Template[]>()

  const _getTemplates = async () => {
    const response = await getTemplates();
    setTemplates(response);
    console.log(templates);
  }

  const _createTemplates = async (content: string, variables: Record<string, string>) => {
    const input: Template = {
      content: content,
      variables: variables
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

  const _interactionConversation = async (conversation_id: string, message: string) => {
    try {
      const res = await interactionConversation(conversation_id, message);
      setMessages((prev) => ([...prev, { from: "service", message: res.message }]));
    } catch (error) {
      console.error('[interactionConversation]: ', error);
    }
  }

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (message.trim() !== '') {
      setMessages((prev) => ([...prev, { from: "client", message: message }]));
      setMessage('');
      const conversation_id = getSessionKey("conversation_id");
      if (conversation_id) {
        _interactionConversation(conversation_id, message);
      }
    }
  };


  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ whiteSpace: 'pre-line' }}>{msg.message}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );

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
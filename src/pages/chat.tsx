import { useState } from 'react'
import { createConversation, createTemplate, getTemplates, interactionConversation } from '../services'
import { getSessionKey, setSessionKey } from '../LocalStorage'
import { Conversation, Messages, Template } from '../types'

export enum Keys {
    messages = "MESSAGES",
    conversation_id = "CONVERSATION_ID",
    template_id = "TEMPLATE_ID"
}

function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Messages[]>([]);
    const [templates, setTemplates] = useState<Template[]>()

    const _getTemplates = async () => {
        const response = await getTemplates();
        setTemplates(response);
    }

    const _createTemplate = async (content: string, variables: Record<string, string>) => {
        const input: Template = {
            content: content,
            variables: variables
        }
        const { id } = await createTemplate(input);
        if (id) setSessionKey(Keys.template_id, id);
    }

    const _createConversation = async (variables: Record<string, string>, prompt_id: string) => {
        const input: Conversation = {
            temperature: 0.7,
            variables: variables,
            prompt_id: prompt_id
        }
        const { id } = await createConversation(input);
        setSessionKey(Keys.conversation_id, id);
    }

    const _interactionConversation = async (conversation_id: string, message: string) => {
        try {
            const res = await interactionConversation(conversation_id, message);
            let dataMessages = [...messages,{from: "client", message: message},{ from: "service", message: res.message }]
            setMessages(dataMessages);
            setSessionKey(Keys.messages, JSON.stringify(dataMessages));
        } catch (error) {
            console.error('[interactionConversation]: ', error);
        }
    }

    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async () => {
        if (message.trim() !== '') {
            setMessage('');
            const conversation_id = getSessionKey("conversation_id");
            if (conversation_id) {
                _interactionConversation(conversation_id, message);
            }
        }
    };

    const teste = () => {
        // _getTemplates();
        // _createTemplate("Você é um vendedor de roupas masculinas! Venda!!!", {
        //     "name": "string",
        // });
        // const template_id = getSessionKey(Keys.template_id)
        // if (template_id)_createConversation({
        //     "name": "Allyson"
        // }, template_id );
        const conversation_id = getSessionKey(Keys.conversation_id)
        if (conversation_id) _interactionConversation(conversation_id, "Olá, boa tarde!")
    }

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} style={{ whiteSpace: 'pre-line' }}>
                        {msg.from}: {msg.message}
                    </p>
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

                <button style={{
                    marginTop: 20
                }} onClick={teste}> TESTE </button>

            </div>
        </div>
    );

}

export default Chat


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
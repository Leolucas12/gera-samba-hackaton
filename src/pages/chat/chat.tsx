import { useState } from 'react'
import { createConversation, createTemplate, getTemplates, interactionConversation } from '../../services'
import { getSessionKey, setSessionKey } from '../../LocalStorage'
import { Conversation, Messages, Template } from '../../types'
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"
import { Keys } from '../../enums';

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
        try{
            const { id } = await createTemplate(input);
            if (id) setSessionKey(Keys.template_id, id);
        }catch(error)
        {
            handleError("Ops, Algo deu errado!")
        }
    }

    const _interactionConversation = async (conversation_id: string, message: string) => {
        try {
            const res = await interactionConversation(conversation_id, message);
            let dataMessages = [...messages,{from: "client", message: message},{ from: "service", message: res.message }]
            setMessages(dataMessages);
            setSessionKey(Keys.messages, JSON.stringify(dataMessages));
        } catch (error) {
            handleError("Ops, algo deu errado!");
            console.error('[interactionConversation]: ', error);
        }
    }

    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async () => {
        if (message.trim() !== '') {
            setMessage('');
            const conversation_id = getSessionKey(Keys.conversation_id);
            if (conversation_id) {
                _interactionConversation(conversation_id, message);
            }
        }
    };

    /**
     * Server apenas e unicamente para testes
     */
    const teste = () => {
        // _getTemplates();
        // _createTemplate("Você é um vendedor de roupas masculinas! Venda!!!", {
        //     "name": "string",
        // });
        // const template_id = getSessionKey(Keys.template_id)
        // if (template_id)_createConversation({
        //     "name": "Allyson"
        // }, template_id );
        // const conversation_id = getSessionKey(Keys.conversation_id)
        // if (conversation_id) _interactionConversation(conversation_id, "Olá, boa tarde!")
    }

    const handleError = (error : string) => {
        Toastify({
            text: error,
            duration: 3000,
            style: {
                background: "red",
            }

        }).showToast();
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
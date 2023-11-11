import "./chat.css";
import { useEffect, useState } from "react";
import { interactionConversation } from "../../services";
import {
  getMessageStorange,
  getTemplatesLocal,
  setSessionKey,
} from "../../LocalStorage";
import { Messages } from "../../types";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { Keys } from "../../enums";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import { LocalStorageTemplate } from "../../types";
import send from "../../assets/send.svg";

function Chat() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);
  const [currentTemplate, setCurrentTemplate] =
    useState<LocalStorageTemplate>();

  const _interactionConversation = async (
    conversation_id: string,
    message: string
  ) => {
    try {
      setLoading(true);
      const res = await interactionConversation(conversation_id, message);
      const dataMessages = [
        ...messages,
        { from: "client", message: message },
        { from: "service", message: res.message },
      ];
      setMessages(dataMessages);
        setSessionKey(`${Keys.messages}:${id}`, JSON.stringify(dataMessages));
    } catch (error) {
      handleError("Ops, algo deu errado!");
      console.error("[interactionConversation]: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (message.trim() !== "") {
      setMessage("");
      if (id) _interactionConversation(id, message);
    }
  };

  const handleError = (error: string) => {
    Toastify({
      text: error,
      duration: 3000,
      style: {
        background: "red",
      },
    }).showToast();
  };

  const getCurrentTemplate = () => {
    const templates = getTemplatesLocal();
    const template = templates.filter(
      (template: LocalStorageTemplate) => template.conversation_id === id
    )[0];

    setCurrentTemplate(template);
  };

  useEffect(() => {
      const messageData = getMessageStorange(`${Keys.messages}:${id}`);
    setMessages(messageData);
    getCurrentTemplate();
  }, []);

  return (
    <div className="chat">
      <Header backButton={true} text={currentTemplate?.template_name} />

      <div className="messages">
        {messages.map((msg, index) => (
          <div
            className={msg.from === "client" ? "client-message" : "bot-message"}
            key={index}
          >
            {msg.from !== "client" ? (
              <div className="chat-icons">BOT</div>
            ) : (
              <></>
            )}
            <p>{msg.message}</p>
            {msg.from === "client" ? (
              <div className="chat-icons">EU</div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>

      <p className="message-loading">{loading && "...loading"}</p>

      <div className="message_input">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSubmit}>
          <img src={send} />
        </button>
      </div>
    </div>
  );
}

export default Chat;

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

/*
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
*/

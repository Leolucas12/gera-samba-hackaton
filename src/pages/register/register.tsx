import { useEffect, useState } from "react";
import { createTemplateLocal, parseTemplate, setSessionKey } from "../../LocalStorage";
import bottomLeft from "../../assets/bottom-left.svg";
import topRight from "../../assets/top-right.svg";
import { createConversation, createTemplate } from "../../services";
import "./register.css";
import { Keys } from "../../enums";
import { Conversation } from "../../types";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [newNiche, setNewNiche] = useState(false);
  const [newContext, setNewContext] = useState(false);

  const [company, setCompany] = useState("");
  const [niche, setNiche] = useState("");
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [details, setDetails] = useState("");

  const navigate = useNavigate();

  const defaultNiches = [
    "Restaurante/Lanchonete",
    "Bebidas",
    "Vestuário/Calçados",
    "Construção",
    "Vendas e Marketing",
    "Entretenimento",
  ];

  const defaultContexts = ["Atendimento", "Suporte", "Cadastro"];

  const handleNiche = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    if (value === "Outro") {
      setNewNiche(true);
      setNiche("");
      return;
    }
    setNiche(value);
  };

  const handleContext = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    if (value === "Outro") {
      setNewContext(true);
      setContext("");
      return;
    }
    setContext(value);
  };

  const handleCreateTemplate = async (event: React.FormEvent) => {
    event.preventDefault();
    const templateContent = parseTemplate({
      details: details,
      niche: niche,
      name: company,
      typeContext: context,
      template_name: name,
    });

    const variables = {}

    const { id } = await createTemplate({
      content: templateContent,
      variables: variables,
    });

    createTemplateLocal({
      details: details,
      niche: niche,
      name: company,
      typeContext: context,
      template_name: name,
      id: id,
    });

    const conversation_id = await handleCreateConversation(variables, id!);

    navigate(`/chat/${conversation_id}`);
  };
  
  const handleCreateConversation = async (variables: Record<string, string>, prompt_id: string): Promise<string> => {
    const input: Conversation = {
      temperature: 0.7,
      variables: variables,
      prompt_id: prompt_id
    }
    const { id } = await createConversation(input);
    setSessionKey(Keys.conversation_id, id);
    return id
  }

  useEffect(() => {
    createTemplateLocal({
      details: "teste",
      niche: "educacao",
      name: "programar",
      typeContext: "atendimento",
      template_name: "programar",
      id: "123",
    });
  }, []);
  return (
    <div className="register">
      <div className="container">
        <img className="bottom-left" src={bottomLeft}></img>
        <img className="top-right" src={topRight}></img>
        <div className="row">
          <div className="col-md-12">
            <div className="content-register">
              <header>
                <h1>Gera Samba</h1>
              </header>
              <h2>Cadastro do BOT</h2>
              <form>
                <div className="form-group">
                  <div className="form-group-item">
                    <label htmlFor="">Nome da sua empresa</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Digite o nome da empresa"
                    />
                  </div>

                  <div className="form-group-item">
                    <label htmlFor="">Qual o nicho da sua Empresa</label>
                    {newNiche ? (
                      <input
                        type="text"
                        name=""
                        id=""
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        placeholder="Nicho da sua empresa"
                      />
                    ) : (
                      <select name="" id="" onChange={(e) => handleNiche(e)}>
                        <option value="" disabled defaultValue="">
                          Selecione a área de atuação
                        </option>
                        {defaultNiches.map((niche) => {
                          return (
                            <option key={niche} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                        <option>Outro</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group-item">
                    <label htmlFor="">Titulo do Bot</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite o titulo do bot"
                    />
                  </div>
                  <div className="form-group-item">
                    <label htmlFor="">Tipo do Contexto</label>
                    {newContext ? (
                      <input
                        type="text"
                        name=""
                        id=""
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Contexto do seu bot"
                      />
                    ) : (
                      <select name="" id="" onChange={(e) => handleContext(e)}>
                        <option value="" disabled defaultValue="">
                          Selecione o tipo do bot
                        </option>
                        {defaultContexts.map((niche) => {
                          return (
                            <option key={niche} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                        <option onClick={() => setNewContext(true)}>
                          Outro
                        </option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group-textarea">
                    <label htmlFor="">Descreva o contexto da conversa</label>
                    <textarea
                      name=""
                      id=""
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Exemplo: Nós atuamos no canal de whatsapp. Somos uma loja de bebidas que vende e entrega qualquer bebida do mercado. Utilizamos uma comunicação mais formal com os nossos clientes. Nosso publico tem entre 18-60 anos."
                    ></textarea>
                  </div>
                </div>
                <div className="display-button">
                  <button onClick={handleCreateTemplate}>Cadastrar Bot</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

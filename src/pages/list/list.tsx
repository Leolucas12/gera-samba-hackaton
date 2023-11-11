import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import "./list.css";
import addCircle from "../../assets/add-circle.svg";
import support from "../../assets/support.svg";
import eye from "../../assets/eye.svg";
import { useEffect, useState } from "react";
import { LocalStorageTemplate } from "../../types";
import { getTemplatesLocal } from "../../LocalStorage";

export default function List() {
  const [templates, setTemplates] = useState<LocalStorageTemplate[]>();

  useEffect(() => {
    const templates = getTemplatesLocal();
    const templatesFilter = templates.filter((t: LocalStorageTemplate) => !!t.conversation_id)
    setTemplates(templatesFilter);
  }, []);

  return (
    <div className="list-container">
      <Header backButton={false} text="GERA SAMBA" />
      <div className="title-new-bot">
        <span className="my-bots">Meus Bots</span>
        <section>
          <Link to="/">
            <button>
              <img src={addCircle} />
            </button>
            <span>Criar novo Bot</span>
          </Link>
        </section>
      </div>

      <div className="all-bots">
        {templates?.map((template, index) => {
          return (
            <div className="bot-container" key={index}>
              <img src={support} />
              <section className="bot-desc">
                <h3>{template.template_name}</h3>
                <span>{template.details}</span>
              </section>
              <div className="bot-line" />
              <section className="bot-active">
                <span>
                  <div className="circle" />
                  Ativo
                </span>
              </section>
              <section className="view-bot">
                <Link to={`/chat/${template.conversation_id}`}>
                  <div className="icon">
                    <img src={eye} />
                    <span>Visualizar Bot</span>
                  </div>
                </Link>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
}

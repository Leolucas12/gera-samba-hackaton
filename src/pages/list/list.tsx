import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import "./list.css";
import addCircle from "../../assets/add-circle.svg";
import support from "../../assets/support.svg";
import eye from "../../assets/eye.svg";

export default function List() {
  return (
    <div className="list-container">
      <Header backButton={false} text="GERA SAMBA" />
      <div className="title-new-bot">
        <span className="my-bots">Meus Bots</span>
        <section>
          <Link to="/list">
            <button>
              <img src={addCircle} />
            </button>
          </Link>
          <span>Criar novo Bot</span>
        </section>
      </div>

      <div className="all-bots">
        
        <div className="bot-container">
          <img src={support} />
          <section className="bot-desc">
            <h3>Titulo do chatbot</h3>
            <span>Lorem ipsum it dolor sit a</span>
          </section>
          <div className="bot-line" />
          <section className="bot-active">
            <span>
              <div className="circle" />
              Ativo
            </span>
          </section>
          <section className="view-bot">
            <Link to={``}>
              <div className="icon">
                <img src={eye} />
                <span>Visualizar Bot</span>
              </div>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

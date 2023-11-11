import { Link } from "react-router-dom";
import arrowBack from "../../assets/arrow-back.svg";
import "./header.css";

export default function Header({ backButton = false, text = "" }) {
  return (
    <header className="header-container">
      {backButton ? (
        <button>
          <Link to="/list">
            <img src={arrowBack} />
          </Link>
        </button>
      ) : (
        <></>
      )}
      <span>{text}</span>
    </header>
  );
}

import { Link } from "react-router-dom";
import arrowBack from "../../assets/arrow-back.svg";
import './header.css'

export default function Header({ backButton = false, text = "" }) {
  return (
    <header>
      {backButton ? (
        <Link to="/list">
          <button>
            <img src={arrowBack} />
          </button>
        </Link>
      ) : (
        <></>
      )}
      <span>{text}</span>
    </header>
  );
}

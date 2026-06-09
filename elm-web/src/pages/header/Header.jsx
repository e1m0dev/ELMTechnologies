import {Link, Navigate} from "react-router";
import './css/Header.css'

import reactLogo from './../../assets/React.png'

export function Header() {
    return (
        <header>
            <Link to="/" className="header__logoClick">
                <img className="header__logo" src={reactLogo} alt="React Logo"/>
            </Link>

            <nav className="header__nav">
                <div className="header__div">
                    <Link className="header__link" to="/main">Главная</Link>
                    <Link className="header__link" to="/admin">Админ-Отдел</Link>
                    <Link className="header__link" to="/developers">Разработчик</Link>
                    <Link className="header__link" to="/topics">Форум | Темы</Link>
                </div>
            </nav>
        </header>
    )
}
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
                    <Link className="header__link" to="/main">Информация</Link>
                    <Link className="header__link" to="/developers">Разработчик</Link>
                    <Link className="header__link" to="/topics">Темы | Экзамены</Link>
                </div>
            </nav>
        </header>
    )
}
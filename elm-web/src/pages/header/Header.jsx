import {Link} from "react-router";

export function Header() {

    return (
        <header>
            <nav className="header__nav">
                <div>
                    <Link to="/">Главная</Link>
                    <Link to="/developers">Разработка</Link>
                    <Link to="/topics">Ответы | Электроника</Link>
                </div>
            </nav>
        </header>
    )
}
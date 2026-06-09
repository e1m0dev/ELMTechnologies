import './App.css'
import {Header} from "./pages/header/Header.jsx";
import {Outlet} from "react-router";
import {Footer} from "./pages/header/Footer.jsx";

function App() {

    return (
        <div>
            <Header />
            <Outlet />
            <Footer/>
        </div>
    );
}

export default App

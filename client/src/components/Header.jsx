import KudosLogo from "../assets/kudos-logo.png"
import "../styles/Header.css"

const Header = () => {
    return <header className="banner">
        <h1>Kudos Board</h1>
        <img className="logo-icon" src={KudosLogo}/>
    </header>
}

export default Header;
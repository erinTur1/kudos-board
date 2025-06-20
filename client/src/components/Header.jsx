import { useNavigate } from  "react-router";
import KudosLogo from "../assets/kudos-logo.png"
import { SlArrowLeft } from "react-icons/sl";
import "../styles/Header.css"

const Header = ( {isBackArrowActive} ) => {

    const navigate = useNavigate();

    //back arrow is only active when we are on CardPage
    
    return <header className="banner">
        {isBackArrowActive && <SlArrowLeft className="back-arrow" onClick={() => {
            navigate('/')     
        }}/>}
        <h1>Kudos Board</h1>
        <img className="logo-icon" src={KudosLogo}/>
    </header>
}

export default Header;
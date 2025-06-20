import { useState } from 'react';
import "../styles/LightDarkToggle.css"


const LightDarkToggle = () => {

    const [isLight, setIsLight] = useState(true);

    

    return (
    <label className="toggle-switch">
        <button className={isLight? "activated": "btn"} onClick={() => {
            setIsLight(true);
            document.documentElement.setAttribute('mode', 'light-mode')
        }}>☀️</button>
        <button className={!isLight? "activated": "btn"} onClick={() => {
            setIsLight(false);
            document.documentElement.setAttribute('mode', 'dark-mode')
        }}>🌙</button>
    </label>)

}

export default LightDarkToggle;
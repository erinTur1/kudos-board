import { useState } from 'react';
import "../styles/LightDarkToggle.css"


const LightDarkToggle = () => {

    const [isLight, setIsLight] = useState(true);

    

    return (
    <label className="toggle-switch">
        <button onClick={() => {
            if (!isLight) {
                setIsLight(true);
                document.documentElement.setAttribute('mode', 'light-mode')
            } else {
                setIsLight(false);
                document.documentElement.setAttribute('mode', 'dark-mode')
            }
        }}>{isLight? "☀️": "🌙"}</button>
    </label>)

}

export default LightDarkToggle;
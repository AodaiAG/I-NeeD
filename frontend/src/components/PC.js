import React from 'react';
import { useLanguage } from '../components/LanguageContext'; // Import the useLanguage hook

function PC() {
    const { translation } = useLanguage(); // Access translation from the context

    return (
        <div className="left-col">
            <div className="top-heading">
                <h2>I-Need</h2>
                <p dir="rtl">{translation.expertsTagline}</p>
            </div>
            <div className="text">
                <h2 dir="rtl">{translation.connectExperts}</h2>
                <h4 dir="rtl">{translation.reverseDirection}</h4>
                <p dir="rtl">{translation.hereToConnect}</p>
                <p dir="rtl">{translation.chooseHelp}</p>
                <p dir="rtl">{translation.professionalsOnly}</p>
            </div>
            <img src="/images/main-desktop.png" className="img img-100" alt={translation.mainDesktopAlt} />
        </div>
    );
}

export default PC;

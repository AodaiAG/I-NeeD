import React, { useEffect, useState } from 'react';
import PC from '../components/PC';
import { Link } from 'react-router-dom';
import translations from '../utils/translations.json';
import { useLanguage } from '../components/LanguageContext'; // Import the useLanguage hook
function IntroPage() {

    const { translation } = useLanguage(); // Access translation from the context
    return (
        <div className="container">
            <div className="row">
                <PC />
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt="Phone Case" />
                        <div className="phone-screen">
                            <div className="content" id="intro">
                                <div className="top">
                                    <p dir="rtl" className="intro-subtitle">
                                        {translation.introSubtitle1}<br />
                                        {translation.introSubtitle2}
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">
                                        {translation.introSubtitle3}<br />
                                        {translation.introSubtitle4}<br />
                                        {translation.introSubtitle5}
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">
                                        {translation.introSubtitle6}<br />
                                        {translation.introSubtitle7}
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">
                                        {translation.introSubtitle8}<br />
                                        {translation.introSubtitle9}
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">{translation.availability}</p>
                                    <img className="img-sm intro-img" src="/images/intro.png" alt="Intro" />
                                </div>
                                <div className="bottom">
                                    <p className="text-sm">{translation.agreeTerms}</p>
                                    <Link className='navigate-links' to='/main'>{translation.continue}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroPage;

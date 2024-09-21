import React, { useEffect, useState } from 'react';
import PC from '../components/PC';
import { Link } from 'react-router-dom';
import translations from '../utils/translations.json';
import { useLanguage } from '../components/LanguageContext'; // Import the useLanguage hook

function HomePage() {
    const { translation } = useLanguage(); // Access translation from the context
    return (
        <div className="container">
            <div className="row">
                <PC />
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt="Phone Case" />
                        <div className="phone-screen">
                            <div className="content">
                                <div className="top">
                                    <h2 className="start-title">"{translation.homeTitle}"</h2>
                                    <p dir="rtl" className="start-subtitle">{translation.homeSubtitle}</p>
                                    <img className="img img-90" src="/images/home.png" alt="" />
                                </div>
                                <div className="bottom">
                                    <Link className='navigate-links' to='/intro'>{translation.continue}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

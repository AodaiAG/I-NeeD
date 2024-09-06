// HomePage.js
import React from 'react';
import PC from '../components/PC';
import { Link } from 'react-router-dom';

function HomePage() {
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
                                    <h2 className="start-title">I Need</h2>
                                    <p dir="rtl" className="start-subtitle">כל המומחים במקום אחד</p>
                                    <img className="img img-90" src="/images/home.png" alt="" />
                                </div>
                                <div className="bottom">
                                    <Link className='navigate-links' to='/intro'>קדימה</Link>
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

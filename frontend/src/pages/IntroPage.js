// IntroPage.js
import React from 'react';
import PC from '../components/PC';
import { Link } from 'react-router-dom';

function IntroPage() {
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
                                        אנחנו כאן לחבר אותך, <br />
                                        למיטב המומחים.
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">
                                        בחר תחום , <br />
                                        בחר במה אתה צריך עזרה,<br />
                                        בחר מיקום וזמן.
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">
                                        ואנחנו נמצא את המומחה <br />
                                        שמתאים לך בדיוק.
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">
                                        אנו עובדים רק עם מקצוענים,<br />
                                        אמינים ובמחירים נוחים.
                                    </p>
                                    <p dir="rtl" className="intro-subtitle">זמינות 24/7</p>
                                    <img className="img-sm intro-img" src="/images/intro.png" alt="Intro" />
                                </div>
                                <div className="bottom">
                                    <p className="text-sm">בלחיצה על המשך אני מסכים לתנאים</p>
                                    <Link className='navigate-links' to='/main'>המשך</Link>
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

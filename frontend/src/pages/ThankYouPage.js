import React from 'react';
import { Link } from 'react-router-dom';
import PC from '../components/PC'; // Importing PC component
import { useLanguage } from '../components/LanguageContext'; // Import the useLanguage hook

function ThankYouPage() {
    const { translation } = useLanguage(); // Access translation from the context

    return (
        <div className="container">
            <div className="row">
                <PC /> {/* Same placement of the PC component */}
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt={translation.phoneCaseAlt} className="phone-image" />
                        <div className="phone-screen">
                            <div className="content">
                                <div className="top">
                                    <h2 className="start-title thank-you-title" dir="rtl">
                                        {translation.thankYouTitle}
                                    </h2>
                                    <img src="/images/thankyou.png" alt={translation.thankYouImageAlt} className="img ty-img mt-1" />
                                </div>
                                <div className="bottom mt-1">
                                    <Link className="navigate-links" dir="rtl" to="/">
                                        {translation.finishLink}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThankYouPage;

// ThankYouPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function ThankYouPage() {
    return (
        <div className="container">
            <h2>תודה בקרוב יחזור אליך מומחה, אתה בידים טובות.</h2>
            <img src="/images/thankyou.png" alt="Thank You" />
            <Link className='navigate-links' to='/'>סיום</Link>
        </div>
    );
}

export default ThankYouPage;

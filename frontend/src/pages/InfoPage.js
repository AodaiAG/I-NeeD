// InfoPage.js
import React from 'react';

function InfoPage() {
    return (
        <div>
            <h2>קצת עליך</h2>
            <form>
                <label htmlFor="name">שם פרטי ומשפחה:</label>
                <input type="text" name="name" placeholder="דני שובבני" />

                <label htmlFor="phone">טלפון:</label>
                <input type="text" name="phone" placeholder="0501234567" />

                <label htmlFor="note">הערה:</label>
                <textarea name="note" placeholder="Describe the job"></textarea>

                <button type="submit">חבר לי מומחה</button>
            </form>
        </div>
    );
}

export default InfoPage;

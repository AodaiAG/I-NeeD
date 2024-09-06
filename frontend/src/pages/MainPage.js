// MainPage.js
import React, { useState, useEffect } from 'react';
import PC from '../components/PC';

function MainPage() {
    const [main, setMain] = useState('');
    const [sub, setSub] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        // You can load the main and sub categories via an API call
    }, []);

    return (
        <div className="container">
            <div className="row">
                <PC />
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt="Phone Case" />
                        <div className="phone-screen">
                            <form className="form-book">
                                <label dir="rtl" htmlFor="main">בחר תחום:</label>
                                <select className="custom-select" name="main" value={main} onChange={(e) => setMain(e.target.value)}>
                                    <option value="">ללא בחירה:</option>
                                    <option value={main}>{main}</option>
                                </select>

                                <label dir="rtl" htmlFor="sub">בחר נושא:</label>
                                <select className="custom-select" name="sub" value={sub} onChange={(e) => setSub(e.target.value)}>
                                    <option value="">ללא בחירה:</option>
                                    <option value={sub}>{sub}</option>
                                </select>

                                <label dir="rtl" htmlFor="location">בחר עיר:</label>
                                <input type="text" className="custom-select" value={location} onClick={() => setLocation('location')} placeholder="בחר מיקום לשירות" />

                                <button type="submit" className="navigate-links btnSubmit mt-5">קדימה</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

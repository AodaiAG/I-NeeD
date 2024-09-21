import React, { useState } from 'react';
import PC from '../components/PC';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {API_URL} from "../utils/constans";

function InfoPage() {
    const navigate = useNavigate();
    const location = useLocation(); // Retrieve state from the navigation
    const { main, sub, location: locationValue, dateAndTime } = location.state || {}; // Default to empty object if no state

    const [formData, setFormData] = useState({
        name: '',
        codeN: '97250',
        phone: '',
        note: '',
        jobTypeId: sub, // Use the passed state values
        main: main,
        sub: sub,
        location: locationValue,
        dateAndTime: dateAndTime
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict phone input to digits only
        if (name === 'phone') {
            const phoneValue = value.replace(/\D/g, ''); // Remove any non-digit characters
            setFormData((prevData) => ({
                ...prevData,
                [name]: phoneValue, // Update phone with only digits
            }));
        }
        // Restrict name input to alphabets only
        else if (name === 'name') {
            const nameValue = value.replace(/[^a-zA-Zא-ת\s]/g, ''); // Remove any non-alphabet characters (supports Hebrew too)
            setFormData((prevData) => ({
                ...prevData,
                [name]: nameValue, // Update name with only alphabetic characters
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log form data before sending the request
        //console.log('Submitting form with data:', formData);

        try {
            const response = await axios.post(`${API_URL}/submit-data`, formData);

            // Log the full response object
            console.log('Response from server:', response);

            const { jobId } = response.data; // Retrieve jobId from the response

            // Log the jobId to verify it is being retrieved correctly
            console.log('Received jobId:', jobId);

            // Navigate to the phone_verify page, passing jobId, phone, and codeN as state
            navigate('/phone_verify', {
                state: {
                    requestId: jobId,
                    phone: formData.phone,
                    codeN: formData.codeN
                }
            });

        } catch (error) {
            // Log any errors that occur
            console.error('Error submitting form:', error);
        }
    };



    return (
        <div className="container">
            <div className="row">
                <PC />
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt="Phone Case" />
                        <div className="phone-screen">
                            <div className="content">
                                <form onSubmit={handleSubmit} className="mt-1 form-book" style={{ width: '90%' }}>
                                    <div className="top">
                                        <h2 className="start-title" dir="rtl">קצת עליך</h2>
                                        <div className="input">
                                            <label dir="rtl" htmlFor="name">שם פרטי ומשפחה:</label>
                                            <input
                                                type="text"
                                                dir="rtl"
                                                placeholder="דני שובבני"
                                                name="name"
                                                maxLength="20"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input" style={{ display: 'inline-block' }}>
                                            <label dir="rtl" htmlFor="phone" style={{ display: 'inline-block', width: '100%', textAlign: 'right' }}>טלפון:</label>
                                            <select
                                                name="codeN"
                                                style={{ width: '28%', border: 'none', borderRadius: '4px', padding: '8px', float: 'left', display: 'block', marginTop: '0.5rem', fontSize: 'calc(10px + 0.6vh)', color: '#222825' }}
                                                value={formData.codeN}
                                                onChange={handleChange}

                                            >
                                                {/* Phone code options */}
                                                <option value="97250">050</option>
                                                <option value="97251">051</option>
                                                <option value="97252">052</option>
                                                <option value="97253">053</option>
                                                <option value="97254">054</option>
                                                <option value="97255">055</option>
                                                <option value="97256">056</option>
                                                <option value="97257">057</option>
                                                <option value="97258">058</option>
                                            </select>
                                            <input
                                                type="text"
                                                dir="rtl"
                                                placeholder="123 4567"
                                                name="phone"
                                                maxLength="7"
                                                style={{ width: '70%', border: 'none', borderRadius: '4px', padding: '8px', float: 'right', display: 'block' }}
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="input">
                                            <label dir="rtl" htmlFor="note">הערה:</label>
                                            <textarea
                                                dir="rtl"
                                                placeholder="אני צריך התקנה של שקע חשמל ליד המקרר, יש לי קיר גבס."
                                                name="note"
                                                value={formData.note}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="bottom mt-1">
                                        <input type="hidden" name="jobTypeId" value={formData.jobTypeId} />
                                        <input type="hidden" name="main" value={formData.main} />
                                        <input type="hidden" name="sub" value={formData.sub} />
                                        <input type="hidden" name="location" value={formData.location} />
                                        <input type="hidden" name="dateAndTime" value={formData.dateAndTime} />
                                        <button type="submit" className='navigate-links btnSubmit mt-5'>חבר לי מומחה</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoPage;

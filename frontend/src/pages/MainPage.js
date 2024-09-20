import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PC from '../components/PC';
import {API_URL} from "../utils/constans";

function MainPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [mainOptions, setMainOptions] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [main, setMain] = useState(location.state?.main || localStorage.getItem('main') ||'');
    const [sub, setSub] = useState( location.state?.subP ||localStorage.getItem('sub') || '');
    const [locationValue, setLocationValue] = useState(localStorage.getItem('location') || '');
    const [dateAndTime, setDateAndTime] = useState(localStorage.getItem('dateAndTime') || '');
    const [searchInput, setSearchInput] = useState('');

    const [minDate, setMinDate] = useState('');
    const dateInputRef = useRef(null);  // Ref for the datetime-local input
    const handleCalendarClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();  // Trigger the calendar pop-up
        }
    };
    useEffect(() => {
        console.log('Sub options:', subOptions);
    }, [subOptions]);



    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setMinDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    }, []);



    // Fetch Main Professions
    useEffect(() => {
        const fetchMainProfessions = async () => {
            try {
                const response = await axios.get(`${API_URL}/main-professions`);
                const dataWithoutFirst = response.data.slice(1); // Exclude the first item from the array
                setMainOptions(dataWithoutFirst);
            } catch (error) {
                console.error('Error fetching main professions:', error);
            }
        };
        fetchMainProfessions();
    }, []);

    // Fetch Sub Professions based on selected Main Profession
    useEffect(() => {
        if (main) {
            const fetchSubProfessions = async () => {
                try {
                    const response = await axios.get(`${API_URL}/sub-professions/${main}`);
                    setSubOptions(response.data.slice(1));

                    if (location.state?.subP) {
                        const matchingSubOption = response.data.find(option => option.sub === location.state.subP);
                        if (matchingSubOption) {
                            setSub(matchingSubOption.id);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching sub professions:', error);
                }
            };
            fetchSubProfessions();
        } else {
            setSubOptions([]);
            setSub('');
        }
    }, [main, location.state?.subP]);

    // Store selected values in localStorage before navigating away
    useEffect(() => {
        localStorage.setItem('main', main);
        localStorage.setItem('sub', sub);
        localStorage.setItem('location', locationValue);
        localStorage.setItem('dateAndTime', dateAndTime);
    }, [main, sub, locationValue, dateAndTime]);


    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);


    };
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Redirect to another page (for example, an "information" page)
        if (e.currentTarget.checkValidity()) {
            navigate('/information', {
                state: {
                    main,
                    sub,
                    location: locationValue,
                    dateAndTime
                }
            });
        }
        else {
            // If form is invalid, trigger validation UI
            e.currentTarget.reportValidity(); // Trigger HTML5 validation error messages
        }

    };

    // Handle search submission
    const handleSearch = () => {
        if (searchInput.trim()) {

            navigate(`/search?query=${encodeURIComponent(searchInput)}`);
        }
    };

    // Handle date and time selection
    const handleDateAndTimeChange = (e) => {
        setDateAndTime(e.target.value);
    };

    return (
        <div className="container">
            <div className="row">
                <PC />
                <div className="right-col">
                    <div className="phone-case">
                        <img src="/images/phone.png" alt="Phone Case" />
                        <div className="phone-screen">
                            <div className="main-form">
                                <h2 className="start-title" dir="rtl">במה אפשר לעזור?</h2>

                                {/* Search functionality */}
                                <div className="search searchBtn">
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={handleSearchInputChange}
                                        placeholder="חיפוש ..."
                                        required
                                    />
                                    <i className="ri-search-line" onClick={handleSearch}></i>
                                </div>

                                <form className="mt-1 form-book" onSubmit={handleSubmit}>
                                    <div className="select_input_container">
                                        {/* Main Profession Dropdown */}
                                        <div className="select_item">
                                            <label dir="rtl" htmlFor="main">בחר תחום:</label>
                                            <div className="custom-select-wrapper menu">
                                                <select
                                                    className="custom-select"
                                                    name="main"
                                                    value={main}
                                                    onChange={(e) => setMain(e.target.value)}
                                                    required
                                                >
                                                    <option value="">ללא בחירה:</option>
                                                    {mainOptions.map(option => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.main}
                                                        </option>
                                                    ))}
                                                </select>
                                                <i className="ri-arrow-down-s-fill select-icon"></i>
                                            </div>
                                        </div>

                                        {/* Sub Profession Dropdown */}
                                        <div className="select_item">
                                            <label dir="rtl" htmlFor="sub">בחר נושא:</label>
                                            <div className="custom-select-wrapper menu">
                                                <select
                                                    className="custom-select"
                                                    name="sub"
                                                    value={sub}
                                                    onChange={(e) => setSub(e.target.value)}
                                                    required
                                                    disabled={!main}
                                                >
                                                    <option value="">ללא בחירה:</option>
                                                    {subOptions.map(option => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.sub}
                                                        </option>
                                                    ))}
                                                </select>
                                                <i className="ri-arrow-down-s-fill select-icon"></i>
                                            </div>
                                        </div>

                                        {/* Location Input */}
                                        <div className="select_item">
                                            <label dir="rtl" htmlFor="location">בחר עיר:</label>
                                            <div className="custom-select-wrapper menu">
                                                <input
                                                    type="text"
                                                    dir="rtl"
                                                    className="custom-select"
                                                    name="location"
                                                    id="location"
                                                    onClick={() => window.location.href = '/location'}
                                                    value={locationValue}
                                                    placeholder="בחר מיקום לשירות"
                                                    readOnly
                                                    required
                                                />

                                            </div>
                                        </div>

                                        {/* Calendar/Time Selection */}
                                        <div className="select_item">
                                            <label dir="rtl" htmlFor="dateAndTime">בחר זמן:</label>
                                            <div className="custom-select-wrapper menu" onClick={handleCalendarClick}>
                                                <textarea
                                                    type="text"
                                                    name="dateAndTime"
                                                    className="calendar-date-input"
                                                    style={{ display: 'none' }}
                                                    value={dateAndTime}
                                                    readOnly
                                                    required
                                                ></textarea>

                                                <div className="dropdown">
                                                    <input
                                                        ref={dateInputRef}
                                                        type="datetime-local"
                                                        className="custom-select"
                                                        value={dateAndTime}
                                                        min={minDate}
                                                        onChange={handleDateAndTimeChange}
                                                        required
                                                    />
                                                </div>
                                                <i className="ri-arrow-down-s-fill select-icon" onClick={handleCalendarClick}></i>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="navigate-links btnSubmit mt-1" onSubmit={handleSubmit}>קדימה</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

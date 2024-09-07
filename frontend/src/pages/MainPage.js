import React, { useState, useEffect } from 'react';
import PC from '../components/PC';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MainPage() {
    const [mainOptions, setMainOptions] = useState([]);  // Main professions
    const [subOptions, setSubOptions] = useState([]);    // Sub professions
    const [main, setMain] = useState('');
    const [sub, setSub] = useState('');
    const [location, setLocation] = useState('');
    const [dateAndTime, setDateAndTime] = useState('16/06/2024 18:00');  // Placeholder for calendar
    const [searchInput, setSearchInput] = useState('');  // Capture search input
    const navigate = useNavigate();

    // Fetch Main Professions from the backend
    useEffect(() => {
        const fetchMainProfessions = async () => {
            try {
                const response = await axios.get('/api/main-professions');  // Replace with your backend API
                setMainOptions(response.data);
            } catch (error) {
                console.error('Error fetching main professions:', error);
            }
        };
        fetchMainProfessions();
    }, []);

    // Fetch Sub Professions when Main Profession is selected
    useEffect(() => {
        if (main) {
            const fetchSubProfessions = async () => {
                try {
                    const response = await axios.get(`/api/sub-professions/${main}`);  // Replace with your backend API
                    setSubOptions(response.data);
                } catch (error) {
                    console.error('Error fetching sub professions:', error);
                }
            };
            fetchSubProfessions();
        }
    }, [main]);

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Handle search submission
    const handleSearch = () => {
        if (searchInput.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchInput)}`);  // Pass search query to the search page
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
                                    />
                                    <i className="ri-search-line" onClick={handleSearch}></i>
                                </div>

                                <form className="mt-1 form-book">
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
                                                            {option.name}
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
                                                >
                                                    <option value="">ללא בחירה:</option>
                                                    {subOptions.map(option => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
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
                                                <Link to='/location'>
                                                    <input
                                                        type="text"
                                                        className="custom-select"
                                                        name="location"
                                                        placeholder="בחר מיקום לשירות"
                                                        value={location}
                                                        readOnly
                                                    />
                                                </Link>
                                                <i className="ri-arrow-down-s-fill select-icon"></i>
                                            </div>
                                        </div>

                                        {/* Calendar/Time Selection */}
                                        <div className="select_item">
                                            <label dir="rtl">בחר זמן:</label>
                                            <div className="dropdown">
                                                <input
                                                    type="datetime-local"
                                                    className="custom-select"
                                                    value={dateAndTime}
                                                    onChange={handleDateAndTimeChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="navigate-links btnSubmit mt-5">קדימה</button>
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

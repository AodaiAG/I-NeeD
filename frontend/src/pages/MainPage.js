import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PC from '../components/PC';

function MainPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [mainOptions, setMainOptions] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [main, setMain] = useState(location.state?.main || '');
    const [sub, setSub] = useState(location.state?.subP || '');
    const [locationValue, setLocationValue] = useState('');
    const [dateAndTime, setDateAndTime] = useState('');
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        console.log('Location State:', location.state);
        console.log('Main:', main);
        console.log('Sub:', sub);
    }, [location.state, main, sub]);

    // Fetch Main Professions
    useEffect(() => {
        const fetchMainProfessions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/main-professions');
                setMainOptions(response.data);
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
                    const response = await axios.get(`http://localhost:3001/api/sub-professions/${main}`);
                    setSubOptions(response.data);

                    // Map text to ID if text is available
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


    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
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
                                                    onChange={(e) => {
                                                        console.log('Sub Changed:', e.target.value); // Log when sub profession changes
                                                        setSub(e.target.value);
                                                    }}
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
                                                <Link to='/location'>
                                                    <input
                                                        className="custom-select"
                                                        type="text"
                                                        name="location"
                                                        placeholder="בחר מיקום לשירות"
                                                        value={locationValue}
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

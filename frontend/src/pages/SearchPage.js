import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PC from '../components/PC';
import axios from 'axios';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';  // Get the search query from the URL
    const [main, setMain] = useState('');
    const [subP, setSub] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Send the query to the backend and get results
    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:3001/api/search?query=${encodeURIComponent(query)}`);
            if (response.data.success) {
                console.log('sub response: '+ response.data.jobType.sub);
                setMain(response.data.jobType.main);
                setSub(response.data.jobType.sub);
            } else {
                setError(response.data.message || 'No relevant profession found.');
            }
        } catch (err) {
            setError('Error fetching search results'+err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Trigger search when the page loads
    useEffect(() => {
        if (query) {
            handleSearch();
        }
    }, [query]);

    // Handle form submission to confirm the selected main and sub categories
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', { main, subP }); // Log values before navigating
        if (main && subP) {
            navigate('/main', { state: { main, subP } });
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
                            <div className="content search-content">
                                {loading ? (
                                    <div className="preloader-popup">
                                        <div className="preloader-content">
                                            <img src="/images/preloader.gif" alt="Loading..." />
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="top">
                                            <h2 className="start-title" dir="rtl">אז מה מחפשים?</h2>
                                            <div className="search">
                                                <input
                                                    type="text"
                                                    value={query}
                                                    placeholder="חיפוש ..."
                                                    dir="rtl"
                                                    readOnly
                                                />
                                                <button type="submit" className="buttonSearchIcon">
                                                    <i className="ri-search-line"></i>
                                                </button>
                                            </div>
                                        </div>

                                        {error && <p className="error-message">{error}</p>}

                                        {main && subP && (
                                            <div className="top">
                                                <div className="input">
                                                    <label dir="rtl" htmlFor="main">תחום</label>
                                                    <input
                                                        type="text"
                                                        dir="rtl"
                                                        placeholder={main}
                                                        value={main}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="input">
                                                    <label dir="rtl" htmlFor="sub">נושא</label>
                                                    <input
                                                        type="text"
                                                        dir="rtl"
                                                        placeholder={subP}
                                                        value={subP}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="bottom mt-1">
                                            <img src="/images/search-guy.png" alt="Search Guy" className="img search-img mt-h" />
                                            <input type="submit" value="אישור" className="buttonSearch" dir="rtl" />
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;

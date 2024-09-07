import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PC from '../components/PC';
import axios from 'axios';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');  // Get the query from the URL
    const [main, setMain] = useState('');
    const [sub, setSub] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Send the query to the backend and get results
    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/search', { query });
            setMain(response.data.main || '');
            setSub(response.data.sub || '');
        } catch (err) {
            setError('Error fetching search results');
        } finally {
            setLoading(false);
        }
    };

    // Trigger search when the page loads
    React.useEffect(() => {
        if (query) {
            handleSearch();
        }
    }, [query]);

    // Handle form submission to confirm the selected main and sub categories
    const handleSubmit = (e) => {
        e.preventDefault();
        if (main && sub) {
            navigate('/main', { state: { main, sub } });
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
                                                    readOnly
                                                    placeholder="חיפוש ..."
                                                    dir="rtl"
                                                />
                                            </div>
                                        </div>

                                        {error && <p className="error-message">{error}</p>}

                                        {main && sub && (
                                            <div className="top">
                                                <div className="input">
                                                    <label dir="rtl" htmlFor="main">תחום</label>
                                                    <input type="text" dir="rtl" placeholder={main} value={main} readOnly />
                                                </div>
                                                <div className="input">
                                                    <label dir="rtl" htmlFor="sub">נושא</label>
                                                    <input type="text" dir="rtl" placeholder={sub} value={sub} readOnly />
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

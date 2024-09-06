// LocationPage.js
import React, { useState } from 'react';

function LocationPage() {
    const [location, setLocation] = useState('');

    const handleLocationClick = () => {
        // Handle location selection
    };

    return (
        <div className="container">
            <h2>בחר מיקום לשירות</h2>
            <input type="text" value={location} placeholder="Enter location" onChange={(e) => setLocation(e.target.value)} />
            <button onClick={handleLocationClick}>מצא אותי</button>
            {/* Google Maps integration would go here */}
        </div>
    );
}

export default LocationPage;

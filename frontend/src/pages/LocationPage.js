import React, { useState, useEffect } from 'react';
import PC from '../components/PC';
import { Link } from 'react-router-dom';

function LocationPage() {
    const [address, setAddress] = useState(localStorage.getItem('location') || '');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (window.google && window.google.maps) {
                initMap();  // Initialize the map once Google Maps is available
            } else {
                const interval = setInterval(() => {
                    if (window.google && window.google.maps) {
                        clearInterval(interval);  // Stop checking once maps API is loaded
                        initMap();  // Initialize the map
                    }
                }, 100);  // Check every 100ms
            }
        };

        loadGoogleMaps();  // Call the function to load Google Maps
    }, []);

    const initMap = () => {
        const initialLocation = { lat: 31.0461, lng: 34.8516 };  // Default location
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: initialLocation,
            zoom: 7,
        });

        const marker = new window.google.maps.Marker({
            position: initialLocation,
            map,
        });

        const input = document.getElementById('locationInput');
        const autocomplete = new window.google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                alert("No details available for input: '" + place.name + "'");
                return;
            }
            map.setCenter(place.geometry.location);
            map.setZoom(13);
            marker.setPosition(place.geometry.location);

            setLat(place.geometry.location.lat());
            setLon(place.geometry.location.lng());
            setAddress(place.formatted_address);
        });
    };

    // Get current location using geolocation
    const handleFindMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLat(latitude);
                    setLon(longitude);
                    const location = new window.google.maps.LatLng(latitude, longitude);
                    const map = new window.google.maps.Map(document.getElementById('map'), {
                        center: location,
                        zoom: 13,
                    });
                    const marker = new window.google.maps.Marker({
                        position: location,
                        map,
                    });

                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            setAddress(results[0].formatted_address);
                        } else {
                            alert('Geocoder failed due to: ' + status);
                        }
                    });
                },
                (error) => {
                    alert('Error getting location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('location', address);
        window.location.href = '/main';
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
                                <h2>Select a Location</h2>
                                <label htmlFor="locationInput">Type Location:</label>
                                <input
                                    type="text"
                                    id="locationInput"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="1234 Elm St, City, Country"
                                />
                                {/* Find Me button with Geolocation */}
                                <button className="myLocationBtn" onClick={handleFindMe}>
                                    Find Me: <i className="ri-map-pin-fill"></i>
                                </button>
                                <input type="hidden" id="lat" value={lat} />
                                <input type="hidden" id="lon" value={lon} />
                                <div id="map" style={{ height: '400px', width: '100%' }}></div>

                                {/* Confirm button */}
                                <button onClick={handleSubmit} className="locationSubmitBtn" type="submit">
                                    Confirm
                                </button>

                                <div className="bottom">
                                    <Link to="/main">Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationPage;

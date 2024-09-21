import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './components/LanguageContext'; // Import the provider
import HomePage from './pages/HomePage';
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import LocationPage from './pages/LocationPage';
import InfoPage from './pages/InfoPage';
import ThankYouPage from './pages/ThankYouPage';
import SearchPage from "./pages/SearchPage";
import PhoneVerifyPage from "./pages/VerifyPhonePage";

function App() {
    return (
        <LanguageProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/intro" element={<IntroPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/phone_verify" element={<PhoneVerifyPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/information" element={<InfoPage />} />
                <Route path="/thankyou" element={<ThankYouPage />} />
            </Routes>
        </Router>
        </LanguageProvider>
    );
}

export default App;

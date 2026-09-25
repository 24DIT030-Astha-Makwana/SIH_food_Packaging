import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import GetRecommendationPage from './pages/GetRecommendationPage';
import MyRecommendationsPage from './pages/MyRecommendationsPage';
import PackagingDoctorPage from './pages/PackagingDoctorPage';
import ComparisonPage from './pages/ComparisonPage';
import LearnPage from './pages/LearnPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recommend" element={<GetRecommendationPage />} />
            <Route path="/history" element={<MyRecommendationsPage />} />
            <Route path="/doctor" element={<PackagingDoctorPage />} />
            <Route path="/compare" element={<ComparisonPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

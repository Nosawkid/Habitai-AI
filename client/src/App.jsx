import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import VenueDetails from "./pages/VenueDetails";
import Login from "./pages/Login";

const mockData = [
  {
    id: 1,
    name: "Sai Balaji Luxury PG",
    type: "PG",
    rating: 4.2,
    safetyScore: 4.8,
    distance: "0.5 km",
    image:
      "https://images.unsplash.com/photo-1522771753035-1a5b6562f3ba?auto=format&fit=crop&w=800",
    aiSummary: "Pros: Close to college. Cons: Spicy food.",
  },
  {
    id: 2,
    name: "Annapoorna Mess",
    type: "Mess",
    rating: 3.5,
    safetyScore: 2.9,
    distance: "1.2 km",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800",
    aiSummary: "Pros: Cheap. Cons: Hygiene issues.",
  },
];

function App() {
  // Check login state immediately
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Force reload to clear state
  };

  return (
    <Router>
      <div className="font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col">
        {/* --- GLOBAL NAVBAR --- */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
                  Habitat-AI
                </span>
                <span className="ml-3 px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 text-blue-800 hidden sm:block">
                  MSRIT Edition
                </span>
              </Link>

              {/* Right Side Buttons */}
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-gray-500 hover:text-blue-600 font-medium text-sm"
                >
                  Dashboard
                </Link>

                {/* DYNAMIC AUTH BUTTON */}
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500 hidden md:block">
                      Welcome, {user.email.split("@")[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition border border-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                      Login (Student)
                    </button>
                  </Link>
                  
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home venues={mockData} />} />
            <Route
              path="/venue/:id"
              element={<VenueDetails venues={mockData} />}
            />
            <Route path="/login" element={<Login />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

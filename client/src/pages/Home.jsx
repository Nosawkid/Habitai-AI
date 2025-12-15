import React, { useState } from "react";
import { Link } from "react-router-dom";
import VenueCard from "../components/VenueCard";
import { LayoutGrid, Coffee, Home as HomeIcon, Search } from "lucide-react";

const Home = ({ venues }) => {
  // State to track which category is selected
  const [activeTab, setActiveTab] = useState("All");

  // Logic to filter the cards based on the sidebar selection
  const filteredVenues =
    activeTab === "All"
      ? venues
      : venues.filter((venue) => venue.type === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- LEFT SIDEBAR (The Navigation Area) --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10 top-16">
        {/* //hover cursor pointer */}
        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem
            icon={<LayoutGrid size={18} />}
            label="All Stays"
            isActive={activeTab === "All"}
            onClick={() => setActiveTab("All")}
          />
          <SidebarItem
            icon={<HomeIcon size={18} />}
            label="PG"
            isActive={activeTab === "PG"}
            onClick={() => setActiveTab("PG")}
          />
          <SidebarItem
            icon={<Coffee size={18} />}
            label="Mess"
            isActive={activeTab === "Mess"}
            onClick={() => setActiveTab("Mess")}
          />
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-800">
            <strong>Status:</strong> System Online <br />
            <span className="text-blue-500">Live Review Active</span>
          </div>
        </div>
      </aside>

      {/* --- RIGHT MAIN CONTENT (The Cards) --- */}
      <main className="flex-1 md:ml-64 p-8">
        {/* Header with Search */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "All"
                ? "Discover Safe Stays"
                : `${activeTab} Listings`}
            </h1>
            <p className="text-gray-500 text-sm">
              Real-time safety Reviews & reviews
            </p>
          </div>
          {/* Fake Search Bar for aesthetics */}
          <div className="relative hidden lg:block">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by area..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <Link to={`/venue/${venue.id}`} key={venue.id} className="block">
              <VenueCard {...venue} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

// Helper Component for the Sidebar Buttons
const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      isActive ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Home;

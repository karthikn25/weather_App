import React, { useState } from "react";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const [city, setCity] = useState(""); // Default city is set to Delhi
  const navigate = useNavigate();

  // Function to handle city navigation
  const handleSearch = () => {
    if (city.trim()) {
      navigate(`/${city.trim()}`);
    }
  };

  return (
    <div className="topbar">
      <div className="logo">
        <i className="bx bx-cloud"></i>
        <h6>Weather Station</h6>
      </div>
      <div className="search">
        <input
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(); // Handle Enter key for search
          }}
        />
        <i
          className="bx bx-search"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    </div>
  );
}

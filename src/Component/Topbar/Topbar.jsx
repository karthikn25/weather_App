import React from "react";
import "./Topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="logo">
        <i className="bx bx-cloud"></i>
        <h6>Weather Station</h6>
      </div>
      <div className="search">
        <input placeholder="Search" />
        <i className="bx bx-search"></i>
      </div>
    </div>
  );
}

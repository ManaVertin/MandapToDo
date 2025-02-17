import React, { useState } from 'react';
import {
  FaHome,
  FaCalendarAlt,
  FaClipboardCheck,
  FaTasks,
  FaExclamationTriangle, // Professional urgent icon
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ miniLogoStyle = {} }) {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle the sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* TOP SECTION: White background with logo */}
      <div className="top-section">
        <div className="logo" style={!isOpen ? miniLogoStyle : {}}>
          <img
            src={isOpen ? "/lexmeet.png" : "/minilexmeet.png"}
            alt="LexMeet Logo"
          />
        </div>
      </div>

      {/* SIDEBAR MENU ITEMS */}
      <div className="menu">
        {/* To Do List */}
        <div className="menuItem">
          <FaTasks className="icon" />
          {isOpen && <span>To Do List</span>}
        </div>

        {/* Overdue */}
        <div className="menuItem">
          <FaExclamationTriangle className="icon" /> {/* Professional urgent icon */}
          {isOpen && <span>Missed</span>}
        </div>

        {/* Finished */}
        <div className="menuItem">
          <FaClipboardCheck className="icon" />
          {isOpen && <span>History</span>}
        </div>

        {/* Calendar View */}
        <div className="menuItem">
          <FaCalendarAlt className="icon" />
          {isOpen && <span>Calendar View</span>}
        </div>
      </div>

      {/* Hide/Expand Sidebar Button (pops out from the middle right side) */}
      <button className="hide-btn" onClick={toggleSidebar}>
        {isOpen ? <FaChevronLeft className="icon" /> : <FaChevronRight className="icon" />}
      </button>
    </div>
  );
}

export default Sidebar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";

function AdminDasboard() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    if (unit === 'Courses') {
      navigate('/AdminAddQuiz'); // Navigate to AdminAddQuiz.jsx
    } else {
      navigate(`/${unit.toLowerCase().replace(/\s+/g, '')}`);
    }
  };

  return (
    <div className="container">
      <h1 className="level">Admin Dashboard</h1>
      <p className="select-unit">Select</p>
      <div className="buttons-container">
        <button className="unit-button" onClick={() => handleUnitClick('Admin Users')}>Admin Users</button>
        <button className="unit-button" onClick={() => handleUnitClick('End Users')}>End Users</button>
        <button className="unit-button" onClick={() => handleUnitClick('Courses')}>Courses</button>
      </div>
    </div>
  );
}

export default AdminDasboard;

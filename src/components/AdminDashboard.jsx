import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AdminDashboard.css";

function AdminDashboard() {
  const [selectedUnit, setSelectedUnit] = useState(null);
  const navigate = useNavigate();

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
    if (unit === 'Courses') {
      navigate('/AdminAddCourses'); // Navigate to AdminAddCourses
    } else if (unit === 'Quizes') {
      navigate('/AdminAddQuiz'); // Navigate to AdminAddQuiz
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
        <button className="unit-button" onClick={() => handleUnitClick('Quizes')}>Quizes</button>
      </div>
    </div>
  );
}

export default AdminDashboard;


import React, { useState } from 'react';
import './AdvancedLevelUnits.css';

function AdvancedLevelUnits() {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleNext = () => {
    // Default to Unit 1 if no unit is selected
    if (!selectedUnit) {
      setSelectedUnit('Unit 1');
    }
    // Navigate or handle the selection
  };

  return (
    <div className="container">
      <h1 className="level">Advanced Level</h1>
      <p className="select-unit">Select Unit</p>
      <div className="buttons-container">
        <button className="unit-button" onClick={() => setSelectedUnit('Unit 1')}>Unit 1</button>
        <button className="unit-button" onClick={() => setSelectedUnit('Unit 2')}>Unit 2</button>
        <button className="unit-button" onClick={() => setSelectedUnit('Unit 3')}>Unit 3</button>
        <button className="unit-button" onClick={() => setSelectedUnit('Unit 4')}>Unit 4</button>
      </div>
      <button className="next-button" onClick={handleNext}>NEXT</button>
    </div>
  );
}

export default AdvancedLevelUnits;
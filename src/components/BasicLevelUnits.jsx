import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './BasicLevelUnits.css';

function BasicLevelUnits() {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const navigate = useNavigate();

    const handleNext = () => {
        // Default to Unit 1 if no unit is selected
        if (!selectedUnit) {
            setSelectedUnit('BasicUnit4');
            navigate('/BasicUnit4');
        } else {
            // Navigate based on selected unit
            if (selectedUnit === 'Unit4') {
                navigate('/BasicUnit4');
            } else {
                navigate(`/${selectedUnit.toLowerCase().replace(/\s+/g, '')}`);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="level">Basic Level</h1>
            <p className="select-unit">Select Unit</p>
            <div className="buttons-container">
                <button className="unit-button" onClick={() => setSelectedUnit('Unit 1')}>Unit 1</button>
                <button className="unit-button" onClick={() => setSelectedUnit('Unit 2')}>Unit 2</button>
                <button className="unit-button" onClick={() => setSelectedUnit('Unit 3')}>Unit 3</button>
                <button className="unit-button" onClick={() => {
                    setSelectedUnit('Unit 4');
                    navigate('/BasicUnit4');
                }}>
                    Pre and Post-Retirement Products
                </button>
            </div>
            <button className="next-button" onClick={handleNext}>NEXT</button>
        </div>

    );
}

export default BasicLevelUnits;


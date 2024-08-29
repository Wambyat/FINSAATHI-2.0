import React, { useState } from "react";
import "./AdminAddCourses.css";
import axios from "axios";
import {useAdminAuthRedirect} from "../hooks/AuthRedirect";

function AdminAddCourses() {
  
  useAdminAuthRedirect();
  const [level, setLevel] = useState("");
  const [title, setTitle] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  const [information, setInformation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const data = {
      level,
      title,
      lessonNumber,
      information
    };

    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post('http://localhost:3000/admin/courses/', data);
      setSuccessMessage("Course added successfully");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Course adding failed");
    }
  };

  return (
    <div className="register-container">
      <h1>Admin Add Course</h1>
      <form onSubmit={handleAddCourse}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        
        <label>Level</label>
        <select className="select" value={level} onChange={e => setLevel(e.target.value)}>
          <option value="">Select Level</option>
          <option value="Basic">Basic</option>
          <option value="Advanced">Advanced</option>
        </select>
        
        <label>Course Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        
        <label>Lesson Number</label>
        <input type="text" value={lessonNumber} onChange={e => setLessonNumber(e.target.value)} />
        
        <label>Information</label>
        <textarea value={information} onChange={e => setInformation(e.target.value)} />
        
        <button type="submit">Submit Course</button>
      </form>
    </div>
  );
}

export default AdminAddCourses;


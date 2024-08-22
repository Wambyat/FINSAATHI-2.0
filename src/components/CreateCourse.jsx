import React, {useState} from "react";
import axios from 'axios';
import {useAdminAuthRedirect} from "../hooks/AuthRedirect";

function CreateCourse() {
    useAdminAuthRedirect();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImageLink] = useState("");

    const handleCreateCourse = async () => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.log('Token:', localStorage.getItem('token'));
            const response = await axios.post('http://localhost:3000/admin/courses/', {
                title,
                description,
                price,
                imageLink,
                published: true
            });

            console.log(response.data);
            setTitle("");
            setDescription("");
            setPrice("");
            setImageLink("");
        } catch (error) {
            console.error('Error creating course:', error.message);
        }
    };

    return (
        <div>
            <h1>Create Course Page</h1>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
                   placeholder="Description"/>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price"/>
            <input type="text" value={imageLink} onChange={e => setImageLink(e.target.value)} placeholder="Image Link"/>
            <button onClick={handleCreateCourse}>Create Course</button>
        </div>
    );
}

export default CreateCourse;

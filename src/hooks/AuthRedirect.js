import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function useAuthRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === '') {
            navigate("/Login");
        }
    }, [navigate]);
}

function useAdminAuthRedirect() {
    const navigate = useNavigate();
    useEffect( () => {
        async function checkToken() {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            try {
                const response = await axios.get('http://localhost:3000/admin/check/');
                if (response.data.isAdmin === true) {
                    console.log('Admin check successful:', response.data);
                } else {
                    throw new Error('User is not an admin');
                }
            } catch (error) {
                console.error('Admin check error:', error.message);
                navigate("/Login");
            }
        }
        checkToken().then(r => console.log('Admin check complete'));
    }, [navigate]);
}

export {useAuthRedirect, useAdminAuthRedirect};
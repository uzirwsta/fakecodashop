// src/utils/Auth.js
import axios from 'axios';

export const checkSuperuser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/is_superuser/', {
            withCredentials: true, // Include cookies for authentication
        });
        console.log('Superuser check response:', response.data); // Log the response
        return response.data.is_superuser; // Should return true or false
    } catch (error) {
        console.error('Error checking superuser status:', error);
        return false; // Default to false if there's an error
    }
};
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AdminDashboard from './screens/AdminDashboard';  // Admin Dashboard Component
import OrderScreen from './screens/OrderScreen'; // Import the OrderScreen component
import OrderDetails from './screens/OrderDetails'; // Import the OrderDetails component
import { checkSuperuser } from './utils/Auth'; // Import the superuser check function

function App() {
    const [games, setGames] = useState([]);
    const [isSuperuser, setIsSuperuser] = useState(null); // State to hold superuser status

    useEffect(() => {
        // Fetch data from Django API endpoint
        axios.get('http://localhost:8000/api/games/')
            .then(response => {
                console.log(response.data);  // Log the fetched data to console
                setGames(response.data);  // Set the games data into state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Check if the user is a superuser
        const fetchSuperuserStatus = async () => {
            const status = await checkSuperuser();
            console.log('Superuser status:', status); // Log the superuser status
            setIsSuperuser(status);
        };
        fetchSuperuserStatus();
    }, []);  // Empty dependency array means this effect runs only once when the component mounts

    if (isSuperuser === null) {
        return <div>Loading...</div>; // Show loading state while checking superuser status
    }

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomeScreen games={games} />} />
                    <Route 
                        path="/admin" 
                        element={<AdminDashboard />} // Remove the superuser check for testing
                    /> {/* Admin Dashboard */}
                    <Route path="/order-screen" element={<OrderScreen />} /> {/* Order Screen */}
                    <Route path="/order-details" element={<OrderDetails />} /> {/* Order Details Screen */}
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
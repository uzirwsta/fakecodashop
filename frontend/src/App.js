import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Fetch games data from the API
        axios.get('http://localhost:8000/api/games/')
            .then(response => {
                console.log(response.data);
                setGames(response.data); // Update state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <>
            <Header />
            <main>
                <HomeScreen games={games} /> {/* Pass the fetched games data as a prop */}
            </main>
            <Footer />
        </>
    );
}

export default App;
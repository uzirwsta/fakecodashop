import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/games/')
            .then(response => {
                console.log(response.data);
                setGames(response.data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); 

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
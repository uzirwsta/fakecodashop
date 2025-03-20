  import React, { useEffect, useState } from 'react';
  import axios from 'axios';

  function OrderScreen() {
    const [games, setGames] = useState([]); // State to hold available games
    const [orderItems, setOrderItems] = useState([]); // State to hold selected order items
    const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
    const [message, setMessage] = useState(''); // State to hold success/error messages

    useEffect(() => {
      // Fetch available games from the backend
      const fetchGames = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/games/');
          setGames(response.data);
        } catch (error) {
          console.error('Error fetching games:', error);
        }
      };

      fetchGames();
    }, []);

    const handleQuantityChange = (gameId, quantity) => {
      setOrderItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === gameId);
        if (existingItem) {
          // Update quantity if the item already exists
          return prevItems.map(item =>
            item.id === gameId ? { ...item, quantity: parseInt(quantity) } : item
          );
        } else {
          // Add new item to the order
          return [...prevItems, { id: gameId, quantity: parseInt(quantity) }];
        }
      });
    };

    const calculateTotalPrice = () => {
      let total = 0;
      orderItems.forEach(item => {
        const game = games.find(game => game.id === item.id);
        if (game) {
          total += game.price * item.quantity; // Calculate total price
        }
      });
      setTotalPrice(total);
    };

    const handleCreateOrder = async () => {
      try {
        // Temporarily set a placeholder user ID (e.g., 1) for testing
        const placeholderUserId = 1; // Corrected variable name

        const response = await axios.post('http://localhost:8000/api/create-order/', {
          total_price: totalPrice,
          order_items: orderItems, // Send the order items
          user: placeholderUserId, // Send the placeholder user ID
        });

        setMessage(`Order created successfully! Order ID: ${response.data.order_id}`);
        console.log('Order created:', response.data);
        // Reset order items and total price after successful order
        setOrderItems([]);
        setTotalPrice(0);
      } catch (error) {
        console.error('Error creating order:', error);
        setMessage('Error creating order. Please try again.');
      }
    };

    useEffect(() => {
      calculateTotalPrice(); // Recalculate total price whenever order items change
    }, [orderItems]);

    return (
      <div>
        <h1>Create Order</h1>
        <h2>Select Games</h2>
        {games.map(game => (
          <div key={game.id}>
            <h3>{game.name} - ${game.price}</h3>
            <input
              type="number"
              min="0"
              placeholder="Quantity"
              onChange={(e) => handleQuantityChange(game.id, e.target.value)}
            />
          </div>
        ))}
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <button onClick={handleCreateOrder}>Create Order</button>
        {message && <p>{message}</p>} {/* Display success/error message */}
      </div>
    );
  }

  export default OrderScreen;
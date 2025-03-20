import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [dashboardStats, setDashboardStats] = useState({});
  const [users, setUsers] = useState([]);
  const [gameDetails, setGameDetails] = useState([]); // State to hold game details

  useEffect(() => {
    // Fetch the dashboard stats from the backend
    axios.get('http://localhost:8000/api/dashboard-stats/')
      .then(response => {
        setDashboardStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard stats:', error);
      });

    // Fetch user data from the backend
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Fetch game details from the backend
    axios.get('http://localhost:8000/api/game-details/')
      .then(response => {
        setGameDetails(response.data); // Set the game details into state
      })
      .catch(error => {
        console.error('Error fetching game details:', error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <h2>Dashboard Stats</h2>
        <ul>
          <li>Total Users: {dashboardStats.total_users}</li>
          <li>Total Products: {dashboardStats.total_products}</li>
          <li>Total Orders: {dashboardStats.total_orders}</li>
          <li>Total Revenue: {dashboardStats.total_revenue}</li>
        </ul>
      </div>

      <div>
        <h2>User List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Is Superuser</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_superuser ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2>Game Details</h2>
        {gameDetails.length === 0 ? (
          <p>No game details found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Game ID</th>
                <th>Game Name</th>
                <th>Number Sold</th>
                <th>Total Sales Amount</th>
              </tr>
            </thead>
            <tbody>
              {gameDetails.map(game => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.name}</td>
                  <td>{game.total_sold}</td>
                  <td>${game.total_sales_amount ? game.total_sales_amount.toFixed(2) : '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2>Order Details</h2>
        <p>
          <Link to="/order-details">View Order Details</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
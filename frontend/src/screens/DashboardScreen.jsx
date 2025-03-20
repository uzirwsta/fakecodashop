import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch dashboard stats from the backend
    axios.get('http://localhost:8000/api/dashboard-stats/')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard Stats</h1>
      <ul>
        <li>Total Users: {stats.total_users}</li>
        <li>Total Products: {stats.total_products}</li>
        <li>Total Orders: {stats.total_orders}</li>
        <li>Total Revenue: {stats.total_revenue}</li>
      </ul>
    </div>
  );
}

export default Dashboard;

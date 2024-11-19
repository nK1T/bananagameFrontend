import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import socket from '../../socket';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/admin/users');
      setUsers(res.data);
    };
    fetchUsers();

    socket.on('updateRanks', (data) => {
      setUsers(data);
    });

    return () => {
      socket.off('updateRanks');
    };
  }, []);

  const blockUser = async (userId) => {
    await axios.post(`/admin/block/${userId}`);
    alert('User blocked!');
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <ul className={styles.userList}>
        {users.sort((a, b) => b.clickCount - a.clickCount).map((user) => (
          <li key={user._id} className={styles.userItem}>
            <span className={styles.userName}>
              {user.name} <span className={styles.clickCount}>({user.clickCount} 🍌)</span>
            </span>
            <button className={styles.blockButton} onClick={() => blockUser(user._id)}>
              Block
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

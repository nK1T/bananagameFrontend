import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';
import axios from '../../services/api';
import styles from './PlayerHome.module.css';

const PlayerHome = () => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    const fetchClickCount = async () => {
      try {
        const res = await axios.get('/player/me');
        setClickCount(res.data.clickCount);
      } catch (error) {
        console.error('Error fetching click count:', error);
      }
    };

    fetchClickCount();

    if (!userId) {
      navigate('/');
      return;
    }

    const user = { _id: userId, username: username || 'Player', clickCount: 0 };
    socket.emit('join', user);
    socket.on('updateClickCount', (count) => {
      setClickCount(count);
    });

    return () => {
      socket.off('updateClickCount');
    };
  }, [navigate]);

  const handleClick = () => {
    const userId = localStorage.getItem('userId');
    // console.log('Emitting bananaClick for user:', userId);
    socket.emit('bananaClick', userId);
  };

  return (
    <div className={styles.container}>
      {/* <h1>Welcome to the Banana Game!</h1> */}
      <p>{clickCount}</p>
      <img onClick={handleClick} src='/banana2.png'/>
    </div>
  );
};

export default PlayerHome;

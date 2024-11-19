import React, { useState, useEffect } from 'react';
import socket from '../../socket';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './RankPage.module.css';

const RankPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    const fetchRanks = async () => {
      try {
        const res = await axios.get('/player/rankings');
        setRankings(res.data);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      }
    };

    fetchRanks();
  }, []);

  if (!userId) {
    navigate('/');
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>Player Rankings</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {rankings
            .sort((a, b) => b.clickCount - a.clickCount)
            .map((player, index) => (
              <tr key={player._id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.clickCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankPage;

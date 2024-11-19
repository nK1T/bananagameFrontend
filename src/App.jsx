import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import PlayerHome from './components/PlayerDashboard/PlayerHome';
import RankPage from './components/PlayerDashboard/RankPage';
import Header from './components/Header/Header';
import "./App.css";

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

function AppWrapper() {
  const location = useLocation();

  const noHeaderRoutes = ["/admin"];

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/player/" element={<PlayerHome />} />
        <Route path="/player/leaderboard" element={<RankPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

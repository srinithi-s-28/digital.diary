import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DiaryCard from '../components/DiaryCard';
import { diaryAPI } from '../services/api';

const Dashboard = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await diaryAPI.getAll();
      setDiaries(response.data.diaries);
    } catch (error) {
      setError('Failed to fetch diary entries');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (diary) => {
    navigate('/add-diary', { state: { diary } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this diary entry?')) {
      try {
        await diaryAPI.delete(id);
        setDiaries(diaries.filter(diary => diary._id !== id));
      } catch (error) {
        setError('Failed to delete diary entry');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="dashboard">
          <div className="dashboard-header">
            <h2>📝 My Diary Entries</h2>
            <Link to="/add-diary" className="add-btn">
              ✨ Add New Entry
            </Link>
          </div>

          {error && <div className="error">{error}</div>}

          {diaries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <p style={{ fontSize: '1.2rem' }}>No diary entries yet. Start writing your first entry!</p>
            </div>
          ) : (
            <div className="diary-grid">
              {diaries.map(diary => (
                <DiaryCard
                  key={diary._id}
                  diary={diary}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
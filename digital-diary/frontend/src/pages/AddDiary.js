import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { diaryAPI } from '../services/api';

const AddDiary = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    date: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editingDiary = location.state?.diary;

  useEffect(() => {
    if (editingDiary) {
      setFormData({
        title: editingDiary.title,
        content: editingDiary.content,
        mood: editingDiary.mood,
        date: new Date(editingDiary.date).toISOString().split('T')[0]
      });
    }
  }, [editingDiary]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editingDiary) {
        await diaryAPI.update(editingDiary._id, formData);
      } else {
        await diaryAPI.create(formData);
      }
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save diary entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="diary-form-container">
          <form className="diary-form" onSubmit={handleSubmit}>
        <h2>{editingDiary ? '✏️ Edit Diary Entry' : '✨ Add New Diary Entry'}</h2>
            {error && <div className="error">{error}</div>}
            
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mood:</label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
              >
                <option value="happy">😊 Happy</option>
                <option value="sad">😢 Sad</option>
                <option value="excited">🤩 Excited</option>
                <option value="angry">😠 Angry</option>
                <option value="neutral">😐 Neutral</option>
                <option value="anxious">😰 Anxious</option>
              </select>
            </div>

            <div className="form-group">
              <label>Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="10"
                required
              />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? '⏳ Saving...' : (editingDiary ? '✨ Update Entry' : '✨ Save Entry')}
            </button>

            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={() => navigate('/dashboard')}
            >
              ❌ Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDiary;
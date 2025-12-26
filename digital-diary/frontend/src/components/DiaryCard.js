import React from 'react';

const DiaryCard = ({ diary, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      happy: '😊',
      sad: '😢',
      excited: '🤩',
      angry: '😠',
      neutral: '😐',
      anxious: '😰'
    };
    return moodEmojis[mood] || '😐';
  };

  return (
    <div className="diary-card">
      <h3>{diary.title}</h3>
      <div className="diary-meta">
        <span>📅 {formatDate(diary.date)}</span>
        <span className={`mood-badge mood-${diary.mood}`}>
          {getMoodEmoji(diary.mood)} {diary.mood}
        </span>
      </div>
      <div className="diary-content">
        {diary.content.length > 150 
          ? `${diary.content.substring(0, 150)}...` 
          : diary.content
        }
      </div>
      <div className="diary-actions">
        <button 
          className="btn-small btn-edit" 
          onClick={() => onEdit(diary)}
        >
          ✏️ Edit
        </button>
        <button 
          className="btn-small btn-delete" 
          onClick={() => onDelete(diary._id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryCard;
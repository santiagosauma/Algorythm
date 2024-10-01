import React, { useEffect, useState } from 'react';
import { supabase } from './components/supabaseClient';
import './components/styles/SortList.css';
import { useNavigate } from 'react-router-dom';

function SortList() {
  const [sorts, setSorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSorts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sorts')
      .select('*');

    if (error) {
      console.error('Error fetching sorts:', error);
    } else {
      setSorts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSorts();
  }, []);

  const handleCardClick = (sortId) => {
    navigate(`/sorts/${sortId}`);
  };

  if (loading) {
    return <p>Loading sorts...</p>;
  }

  if (sorts.length === 0) {
    return <p>No sorts available.</p>;
  }

  return (
    <div className="sort-list">
      {sorts.map((sort) => (
        <div
          key={sort.id}
          className="sort-card"
          onClick={() => handleCardClick(sort.id)}
        >
          <img src={process.env.PUBLIC_URL + sort.image_path} alt={sort.title} className="sort-image" />
          <h3 className="sort-title">{sort.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default SortList;

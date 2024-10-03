import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseConfig';
import TopBar from './TopBar'; 
import './styles/SortDetail.css';

function SortDetails() {
  const { id } = useParams(); 
  const [sortDetails, setSortDetails] = useState(null);
  const [resources, setResources] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSortDetails = async () => {
      const { data, error } = await supabase
        .from('sorts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching sort details:', error);
      } else {
        setSortDetails(data);
      }
    };

    const fetchResources = async () => {
      const { data, error } = await supabase
        .from('sorts_resources')
        .select('*')
        .eq('id_sorts_FK', id);

      if (error) {
        console.error('Error fetching resources:', error);
      } else {
        setResources(data);
      }
    };

    fetchSortDetails();
    fetchResources();
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
        <div className="loader-container">
          <ul className="wave-menu">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      );
  }

  if (!sortDetails) {
    return <p>Sort not found.</p>;
  }

  return (
    <div className="sort-details">
      <TopBar />
      
      <div className="sort-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={process.env.PUBLIC_URL + '/resources/arrow.png'} alt="Go Back" className="arrow-back" />
        </button>
        
        <h2 className="sort-title">{sortDetails.title}</h2>

        <div className="resource-buttons">
          {resources.map((resource, index) => (
            <a key={index} href={resource.url_resource} target="_blank" rel="noopener noreferrer" className="resource-button">
              <img src={process.env.PUBLIC_URL + resource.image_path} alt="Resource logo" className="resource-logo" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortDetails;

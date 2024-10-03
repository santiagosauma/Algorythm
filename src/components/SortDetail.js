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
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  const languages = ["Python", "JavaScript", "C++", "Java"];

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

      <div className="code-snippet">
        <div className="header">
          <select 
            className="language-dropdown" 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="editor-content">
          <code className="code">
            <p><span className="color-0">def bubble_sort(arr):</span></p>
            <p className="property">
              <span className="color-2">n = len(arr)</span>
            </p>
            <p className="property">
              <span className="color-2">for i in range(n-1):</span>
            </p>
            <p className="property">
              <span className="color-2">for j in range(n-i-1):</span>
            </p>
            <p className="property">
              <span className="color-2">if arr[j] &gt; arr[j+1]:</span>
            </p>
            <p className="property">
              <span className="color-2">arr[j], arr[j+1] = arr[j+1], arr[j]</span>
            </p>
          </code>
        </div>
      </div>
    </div>
  );
}

export default SortDetails;

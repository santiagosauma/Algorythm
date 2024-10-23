import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseConfig';
import TopBar from './TopBar';
import CodeSnippet from './CodeSnippet';
import Visualizer from './Visualizer';
import './styles/SortDetail.css';

function SortDetails() {
  const { id } = useParams();
  const [sortDetails, setSortDetails] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigate = useNavigate();

  const snippetCodeRef = useRef(null);

  const handleCopyCode = () => {
    if (snippetCodeRef.current) {
      const codeToCopy = snippetCodeRef.current.textContent;
      navigator.clipboard.writeText(codeToCopy)
        .then(() => {
          setSnackbarVisible(true);
          setTimeout(() => {
            setSnackbarVisible(false);
          }, 3000);
        })
        .catch((error) => {
          console.error('Failed to copy code: ', error);
        });
    }
  };

  const handlePracticeClick = () => {
    navigate('/practice');
  };

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

      <div className="content">
        <div className="visualizer-container">
          <Visualizer id={id} />
        </div>

        <div className="code-and-actions">
          <CodeSnippet id_sort={id} snippetCodeRef={snippetCodeRef} />
          <div className="action-buttons-container">
            <button className="how-to-use-button">
              <img src={process.env.PUBLIC_URL + '/resources/info.png'} alt="Info icon" className="button-icon" />
              How to use
            </button>
            <button className="copy-code" onClick={handleCopyCode}>
              <img src={process.env.PUBLIC_URL + '/resources/copy.png'} alt="Copy icon" className="button-icon" />
              Copy Code
            </button>
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
          </div>
        </div>

        {snackbarVisible && (
          <div className="snackbar">
            Code copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}

export default SortDetails;
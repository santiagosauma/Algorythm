import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseConfig';
import './styles/CodeSnippet.css';

function CodeSnippet({ id_sort, snippetCodeRef }) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [snippet, setSnippet] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await supabase
        .from('sorts_snippets')
        .select('language')
        .eq('id_sort', id_sort);

      if (error) {
        console.error('Error fetching languages:', error);
      } else {
        const uniqueLanguages = [...new Set(data.map(item => item.language))];
        setLanguages(uniqueLanguages);
        setSelectedLanguage(uniqueLanguages[0]);
      }
    };

    fetchLanguages();
  }, [id_sort]);

  useEffect(() => {
    const fetchSnippet = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('sorts_snippets')
        .select('*')
        .eq('id_sort', id_sort)
        .eq('language', selectedLanguage);

      if (error) {
        console.error('Error fetching snippet:', error);
      } else {
        setSnippet(data[0]?.snippet || 'No code snippet found for this language');
      }
      setLoading(false);
    };

    if (selectedLanguage) {
      fetchSnippet();
    }
  }, [id_sort, selectedLanguage]);

  const formatSnippet = (code) => {
    return code.replace(/\\n/g, '\n').replace(/\\t/g, '    ');
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="ld-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
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
      <div className="editor-content" ref={snippetCodeRef}>
        <pre className="code">
          {formatSnippet(snippet)}
        </pre>
      </div>
    </div>
  );
}

export default CodeSnippet;

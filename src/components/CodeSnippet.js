import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseConfig';
import './styles/CodeSnippet.css';

function CodeSnippet({ id_sort }) {
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

  useEffect(() => {
    const snippetElement = document.querySelector('.code-snippet');
    const editorContent = document.querySelector('.editor-content');

    if (snippetElement && editorContent) {
      const lines = snippet.split('\n');
      const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);

      if (snippetElement.scrollHeight > snippetElement.clientHeight) {
        snippetElement.classList.add('has-scroll');
        editorContent.style.fontSize = '1rem';
      } else {
        snippetElement.classList.remove('has-scroll');

        // Ajustar el tamaño de la fuente basado en la longitud de la línea más larga
        if (longestLine <= 50) {
          editorContent.style.fontSize = '1.5rem';
        } else if (longestLine <= 80) {
          editorContent.style.fontSize = '1.25rem';
        } else if (longestLine <= 100) {
          editorContent.style.fontSize = '1.1rem';
        } else {
          editorContent.style.fontSize = '1rem';
        }
      }
    }
  }, [snippet]);

  const formatSnippet = (code) => {
    return code.replace(/\\n/g, '\n').replace(/\\t/g, '    ');
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div class="ld-ripple">
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
      <div className="editor-content">
        <pre className="code">
          {formatSnippet(snippet)}
        </pre>
      </div>
    </div>
  );
}

export default CodeSnippet;

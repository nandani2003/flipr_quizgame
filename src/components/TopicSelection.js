import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopicSelectionPage() {
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedTopics, setSortedTopics] = useState([]);
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-eexgfbu/endpoint/v2/list?list=show');
        console.log(response.data);
        setTopics(response.data);
        setSortedTopics(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopics();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredTopics = topics.filter(topic => topic.topic.toLowerCase().includes(searchTerm.toLowerCase()));
    setSortedTopics(filteredTopics);
  };

  const handleSort = (event) => {
    const sortOption = event.target.value;
    let sortedTopics = [...topics];
    if (sortOption === 'alphabetical') {
      sortedTopics.sort((a, b) => a.topic.localeCompare(b.topic));
    }
    setSortedTopics(sortedTopics);
  };

  const handleDifficultyLevelChange = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected topic:', selectedTopic);
    console.log('Difficulty level:', difficultyLevel);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2em', marginTop: '2rem', color: '#ff6f61', textAlign: 'center' }}>Select a Topic</h1>
      <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search topics" style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px', width: '80%', border: '1px solid #ccc' }} />
      <select value={sortedTopics} onChange={handleSort} style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px', width: '80%', border: '1px solid #ccc' }}>
        <option value="alphabetical">Sort Alphabetically</option>
      </select>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', justifyContent: 'center', width: '80%', marginTop: '1rem' }}>
        {sortedTopics.map(topic => (
          <div key={topic.topic} style={{ padding: '1rem', borderRadius: '8px', backgroundColor: '#f0f0f0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h2 style={{ margin: '0', fontSize: '1.5em', fontWeight: 'bold', color: '#ff6f61' }}>{topic.topic}</h2>
            <p style={{ margin: '0.5rem 0', fontSize: '1em', color: '#333' }}>Easy: {topic.easy}, Medium: {topic.medium}, Hard: {topic.hard}</p>
            <button style={{ padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#ff6f61', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} onClick={() => handleTopicSelect(topic)}>Select</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', width: '80%' }}>
        <h2 style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#ff6f61', textAlign: 'center' }}>Select Difficulty Level</h2>
        <select value={difficultyLevel} onChange={handleDifficultyLevelChange} style={{ marginTop: '1rem', padding: '0.5rem', borderRadius: '5px', width: '100%', border: '1px solid #ccc' }}>
          <option value="">Choose difficulty level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button type="submit" style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', borderRadius: '5px', backgroundColor: '#ff6f61', color: 'white', border: 'none', cursor: 'pointer', width: '80%', maxWidth: '300px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default TopicSelectionPage;

import React, { useState } from 'react';
import { SearchFilters } from '../types';

interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleAddInterest = () => {
    if (interest.trim() && !interests.includes(interest.trim())) {
      setInterests([...interests, interest.trim()]);
      setInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: SearchFilters = {};
    
    if (name.trim()) filters.name = name.trim();
    if (location.trim()) filters.location = location.trim();
    if (interests.length > 0) filters.interests = interests;
    
    onSearch(filters);
  };

  const handleReset = () => {
    setName('');
    setLocation('');
    setInterest('');
    setInterests([]);
    onSearch({});
  };

  return (
    <div className="search-filter">
      <h3>Search Profiles</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="interest">Interests</label>
          <div className="interest-input">
            <input
              type="text"
              id="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="Add an interest"
            />
            <button 
              type="button" 
              onClick={handleAddInterest}
              className="btn-add-interest"
            >
              Add
            </button>
          </div>
          
          {interests.length > 0 && (
            <div className="interest-tags">
              {interests.map((int, index) => (
                <span key={index} className="interest-tag">
                  {int}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveInterest(int)}
                    className="btn-remove-interest"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-search">Search</button>
          <button type="button" onClick={handleReset} className="btn-reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter; 
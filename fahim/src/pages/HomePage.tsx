import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import MapView from '../components/MapView';
import SearchFilter from '../components/SearchFilter';
import LoadingIndicator from '../components/LoadingIndicator';
import { ApiService } from '../services/api';
import { Profile, SearchFilters } from '../types';

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await ApiService.getProfiles();
        setProfiles(data);
        setFilteredProfiles(data);
      } catch (err) {
        setError('Failed to load profiles. Please try again later.');
        console.error('Error fetching profiles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSummaryClick = (profile: Profile) => {
    setSelectedProfile(profile);
    // Scroll to the map section
    const mapElement = document.getElementById('map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = async (filters: SearchFilters) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // If no filters, reset to all profiles
      if (Object.keys(filters).length === 0) {
        setFilteredProfiles(profiles);
        setIsLoading(false);
        return;
      }
      
      const results = await ApiService.searchProfiles(filters);
      setFilteredProfiles(results);
    } catch (err) {
      setError('Failed to search profiles. Please try again.');
      console.error('Error searching profiles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="search-section">
        <SearchFilter onSearch={handleSearch} />
      </div>
      
      <div className="content-section">
        <div className="profiles-section">
          <h1>Profile Explorer</h1>
          
          {error && <div className="error-container">{error}</div>}
          
          {isLoading ? (
            <LoadingIndicator message="Loading profiles..." />
          ) : filteredProfiles.length > 0 ? (
            <div className="profiles-grid">
              {filteredProfiles.map(profile => (
                <ProfileCard 
                  key={profile.id} 
                  profile={profile} 
                  onSummaryClick={handleSummaryClick} 
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No profiles found matching your search criteria.</p>
            </div>
          )}
        </div>
        
        <div id="map-section" className="map-section">
          <h2>{selectedProfile ? `Location: ${selectedProfile.name}` : 'All Locations'}</h2>
          <MapView 
            selectedProfile={selectedProfile} 
            profiles={selectedProfile ? undefined : filteredProfiles} 
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
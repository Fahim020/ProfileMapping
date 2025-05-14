import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MapView from '../components/MapView';
import LoadingIndicator from '../components/LoadingIndicator';
import { ApiService } from '../services/api';
import { Profile } from '../types';

const ProfileDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) {
        setError('Profile ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const profileId = parseInt(id, 10);
        
        if (isNaN(profileId)) {
          setError('Invalid profile ID');
          setIsLoading(false);
          return;
        }
        
        const data = await ApiService.getProfileById(profileId);
        
        if (!data) {
          setError('Profile not found');
          setIsLoading(false);
          return;
        }
        
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile details. Please try again later.');
        console.error('Error fetching profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (isLoading) {
    return <LoadingIndicator message="Loading profile details..." />;
  }

  if (error || !profile) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Failed to load profile'}</p>
        <Link to="/" className="btn-back">Back to Profiles</Link>
      </div>
    );
  }

  return (
    <div className="profile-details-page">
      <div className="profile-header">
        <Link to="/" className="btn-back">Back to Profiles</Link>
        <h1>{profile.name}</h1>
      </div>
      
      <div className="profile-content">
        <div className="profile-info">
          <div className="profile-image">
            <img src={profile.photo} alt={`${profile.name}'s portrait`} />
          </div>
          
          <div className="profile-details">
            <div className="detail-item">
              <h3>Description</h3>
              <p>{profile.description}</p>
            </div>
            
            <div className="detail-item">
              <h3>Address</h3>
              <p>{profile.address}</p>
            </div>
            
            {profile.contactInfo && (
              <div className="detail-item">
                <h3>Contact Information</h3>
                <ul>
                  {profile.contactInfo.email && (
                    <li>
                      <strong>Email:</strong> <a href={`mailto:${profile.contactInfo.email}`}>{profile.contactInfo.email}</a>
                    </li>
                  )}
                  
                  {profile.contactInfo.phone && (
                    <li>
                      <strong>Phone:</strong> <a href={`tel:${profile.contactInfo.phone}`}>{profile.contactInfo.phone}</a>
                    </li>
                  )}
                  
                  {profile.contactInfo.website && (
                    <li>
                      <strong>Website:</strong> <a href={profile.contactInfo.website.startsWith('http') ? profile.contactInfo.website : `https://${profile.contactInfo.website}`} target="_blank" rel="noopener noreferrer">{profile.contactInfo.website}</a>
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {profile.interests && profile.interests.length > 0 && (
              <div className="detail-item">
                <h3>Interests</h3>
                <div className="interest-tags">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-map">
          <h2>Location</h2>
          <MapView selectedProfile={profile} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage; 
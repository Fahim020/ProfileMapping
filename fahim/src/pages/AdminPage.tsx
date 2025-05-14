import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import LoadingIndicator from '../components/LoadingIndicator';
import { ApiService } from '../services/api';
import { Profile } from '../types';

const AdminPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await ApiService.getProfiles();
      setProfiles(data);
    } catch (err) {
      setError('Failed to load profiles. Please try again later.');
      console.error('Error fetching profiles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProfile = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsAddMode(false);
    setSuccessMessage(null);
  };

  const handleAddNewProfile = () => {
    setSelectedProfile(null);
    setIsAddMode(true);
    setSuccessMessage(null);
  };

  const handleDeleteProfile = async (profileId: number) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const success = await ApiService.deleteProfile(profileId);
      
      if (success) {
        setProfiles(profiles.filter(p => p.id !== profileId));
        setSuccessMessage('Profile deleted successfully');
        
        // If the deleted profile was selected, reset
        if (selectedProfile && selectedProfile.id === profileId) {
          setSelectedProfile(null);
          setIsAddMode(false);
        }
      } else {
        setError('Failed to delete profile');
      }
    } catch (err) {
      setError('Failed to delete profile. Please try again.');
      console.error('Error deleting profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (profileData: Omit<Profile, 'id'>) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);
      
      if (isAddMode) {
        // Add new profile
        const newProfile = await ApiService.addProfile(profileData);
        setProfiles([...profiles, newProfile]);
        setSuccessMessage('Profile added successfully');
        setIsAddMode(false);
      } else if (selectedProfile) {
        // Update existing profile
        const updatedProfile = await ApiService.updateProfile(
          selectedProfile.id,
          profileData
        );
        
        if (updatedProfile) {
          setProfiles(
            profiles.map(p => p.id === selectedProfile.id ? updatedProfile : p)
          );
          setSelectedProfile(updatedProfile);
          setSuccessMessage('Profile updated successfully');
        } else {
          setError('Failed to update profile');
        }
      }
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error('Error saving profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Profile Administration</h1>
        <Link to="/" className="btn-back">Back to Profiles</Link>
      </div>
      
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {successMessage && (
        <div className="success-container">
          <p>{successMessage}</p>
          <button onClick={() => setSuccessMessage(null)}>Dismiss</button>
        </div>
      )}
      
      <div className="admin-content">
        <div className="profiles-list">
          <div className="list-header">
            <h2>Profiles</h2>
            <button 
              className="btn-add" 
              onClick={handleAddNewProfile}
              disabled={isLoading}
            >
              Add New Profile
            </button>
          </div>
          
          {isLoading ? (
            <LoadingIndicator message="Loading profiles..." />
          ) : profiles.length > 0 ? (
            <ul className="admin-profiles-list">
              {profiles.map(profile => (
                <li key={profile.id} className={selectedProfile?.id === profile.id ? 'selected' : ''}>
                  <span className="profile-name">{profile.name}</span>
                  <div className="profile-actions">
                    <button 
                      onClick={() => handleEditProfile(profile)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No profiles found. Add a new profile to get started.</p>
          )}
        </div>
        
        <div className="profile-edit">
          <h2>{isAddMode ? 'Add New Profile' : (selectedProfile ? `Edit ${selectedProfile.name}` : 'Select a profile to edit')}</h2>
          
          {(isAddMode || selectedProfile) && (
            <ProfileForm 
              profile={selectedProfile || undefined} 
              onSubmit={handleSubmit}
              isLoading={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 
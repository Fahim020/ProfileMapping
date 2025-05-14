import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
  onSummaryClick: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSummaryClick }) => {
  return (
    <div className="profile-card">
      <div className="profile-card-image">
        <img src={profile.photo} alt={`${profile.name}'s portrait`} />
      </div>
      <div className="profile-card-content">
        <h2>{profile.name}</h2>
        <p>{profile.description}</p>
        <p className="profile-card-address">{profile.address}</p>
        <div className="profile-card-actions">
          <button 
            className="btn-summary"
            onClick={() => onSummaryClick(profile)}
          >
            Show on Map
          </button>
          <Link to={`/profile/${profile.id}`} className="btn-details">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 
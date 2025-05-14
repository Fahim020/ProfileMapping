import React, { useState, useEffect } from 'react';
import { Profile } from '../types';

interface ProfileFormProps {
  profile?: Profile;
  onSubmit: (profileData: Omit<Profile, 'id'>) => void;
  isLoading?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  profile, 
  onSubmit,
  isLoading = false
}) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form with profile data if editing
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setPhoto(profile.photo);
      setDescription(profile.description);
      setAddress(profile.address);
      setLatitude(profile.coordinates.lat.toString());
      setLongitude(profile.coordinates.lng.toString());
      setEmail(profile.contactInfo?.email || '');
      setPhone(profile.contactInfo?.phone || '');
      setWebsite(profile.contactInfo?.website || '');
      setInterests(profile.interests || []);
    }
  }, [profile]);

  const handleAddInterest = () => {
    if (interest.trim() && !interests.includes(interest.trim())) {
      setInterests([...interests, interest.trim()]);
      setInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!photo.trim()) newErrors.photo = 'Photo URL is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    
    if (!latitude.trim()) {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }
    
    if (!longitude.trim()) {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const profileData: Omit<Profile, 'id'> = {
        name,
        photo,
        description,
        address,
        coordinates: {
          lat: Number(latitude),
          lng: Number(longitude)
        },
        contactInfo: {
          ...(email && { email }),
          ...(phone && { phone }),
          ...(website && { website })
        },
        interests: interests.length > 0 ? interests : undefined
      };
      
      onSubmit(profileData);
    }
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            disabled={isLoading}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="photo">Photo URL*</label>
          <input
            type="text"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Enter photo URL"
            disabled={isLoading}
          />
          {errors.photo && <p className="error-message">{errors.photo}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
            disabled={isLoading}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address*</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            disabled={isLoading}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="latitude">Latitude*</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter latitude"
              disabled={isLoading}
            />
            {errors.latitude && <p className="error-message">{errors.latitude}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="longitude">Longitude*</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter longitude"
              disabled={isLoading}
            />
            {errors.longitude && <p className="error-message">{errors.longitude}</p>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            disabled={isLoading}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone"
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter website"
            disabled={isLoading}
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
              disabled={isLoading}
            />
            <button 
              type="button" 
              onClick={handleAddInterest}
              className="btn-add-interest"
              disabled={isLoading}
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
                    disabled={isLoading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (profile ? 'Update Profile' : 'Create Profile')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm; 
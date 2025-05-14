import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Profile, MapPosition } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  selectedProfile?: Profile;
  profiles?: Profile[];
  center?: MapPosition;
  zoom?: number;
}

const MapView: React.FC<MapViewProps> = ({ 
  selectedProfile, 
  profiles = [], 
  center = { lat: 39.8283, lng: -98.5795 }, // Center of US by default
  zoom = 4 
}) => {
  // If a selected profile is provided, use its coordinates as the center
  const mapCenter = selectedProfile 
    ? selectedProfile.coordinates 
    : center;
  
  // If a selected profile is provided, zoom in closer
  const mapZoom = selectedProfile ? 12 : zoom;
  
  // Determine which profiles to display on the map
  const displayProfiles = selectedProfile 
    ? [selectedProfile] 
    : profiles;

  return (
    <div className="map-container">
      <MapContainer 
        center={[mapCenter.lat, mapCenter.lng]} 
        zoom={mapZoom} 
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {displayProfiles.map((profile) => (
          <Marker 
            key={profile.id} 
            position={[profile.coordinates.lat, profile.coordinates.lng]}
          >
            <Popup>
              <div className="map-popup">
                <h3>{profile.name}</h3>
                <p>{profile.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView; 
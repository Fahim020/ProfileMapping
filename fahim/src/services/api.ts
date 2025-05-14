import { Profile, SearchFilters } from '../types';

// Mock data for profiles
const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'John Doe',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software Developer with 5 years of experience in React and Node.js',
    address: '123 Tech Street, San Francisco, CA',
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    contactInfo: {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      website: 'johndoe.example.com'
    },
    interests: ['Programming', 'Hiking', 'Photography']
  },
  {
    id: 2,
    name: 'Jane Smith',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'UX Designer specializing in user research and interface design',
    address: '456 Design Ave, New York, NY',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    contactInfo: {
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543'
    },
    interests: ['Design', 'Art', 'Travel']
  },
  {
    id: 3,
    name: 'Robert Johnson',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: 'Data Scientist with expertise in machine learning and AI',
    address: '789 Data Drive, Seattle, WA',
    coordinates: {
      lat: 47.6062,
      lng: -122.3321
    },
    contactInfo: {
      email: 'robert.johnson@example.com',
      phone: '+1 (555) 456-7890',
      website: 'robertjohnson.example.com'
    },
    interests: ['Data Science', 'Machine Learning', 'Chess']
  },
  {
    id: 4,
    name: 'Emily Davis',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'Marketing Manager with 8 years of experience in digital marketing',
    address: '101 Marketing Blvd, Austin, TX',
    coordinates: {
      lat: 30.2672,
      lng: -97.7431
    },
    contactInfo: {
      email: 'emily.davis@example.com',
      phone: '+1 (555) 234-5678'
    },
    interests: ['Marketing', 'Social Media', 'Reading']
  },
  {
    id: 5,
    name: 'Michael Wilson',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'Product Manager with a background in software development',
    address: '222 Product Road, Chicago, IL',
    coordinates: {
      lat: 41.8781,
      lng: -87.6298
    },
    contactInfo: {
      email: 'michael.wilson@example.com',
      phone: '+1 (555) 876-5432'
    },
    interests: ['Product Management', 'Technology', 'Running']
  }
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Service
export const ApiService = {
  getProfiles: async (): Promise<Profile[]> => {
    await delay(800); // Simulate network delay
    return [...mockProfiles];
  },
  
  getProfileById: async (id: number): Promise<Profile | undefined> => {
    await delay(500);
    return mockProfiles.find(profile => profile.id === id);
  },
  
  searchProfiles: async (filters: SearchFilters): Promise<Profile[]> => {
    await delay(600);
    
    let filteredProfiles = [...mockProfiles];
    
    if (filters.name) {
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }
    
    if (filters.location) {
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.address.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.interests && filters.interests.length > 0) {
      filteredProfiles = filteredProfiles.filter(profile => 
        profile.interests?.some(interest => 
          filters.interests!.some(filterInterest => 
            interest.toLowerCase().includes(filterInterest.toLowerCase())
          )
        )
      );
    }
    
    return filteredProfiles;
  },
  
  addProfile: async (profile: Omit<Profile, 'id'>): Promise<Profile> => {
    await delay(1000);
    const newProfile: Profile = {
      ...profile,
      id: mockProfiles.length + 1
    };
    mockProfiles.push(newProfile);
    return newProfile;
  },
  
  updateProfile: async (id: number, profile: Partial<Profile>): Promise<Profile | undefined> => {
    await delay(1000);
    const index = mockProfiles.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProfiles[index] = { ...mockProfiles[index], ...profile };
      return mockProfiles[index];
    }
    return undefined;
  },
  
  deleteProfile: async (id: number): Promise<boolean> => {
    await delay(800);
    const index = mockProfiles.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProfiles.splice(index, 1);
      return true;
    }
    return false;
  }
}; 
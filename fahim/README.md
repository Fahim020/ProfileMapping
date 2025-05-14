# Profile Mapper

A React web application for exploring profiles and their locations on a map.

## Features

- **Profile Display:** View a collection of profiles with essential information like name, photo, and description.
- **Interactive Mapping:** Visualize profile locations on an interactive map.
- **Summary Integration:** Show a profile's location on the map by clicking the "Show on Map" button.
- **Map Services Integration:** Using Leaflet for interactive map functionality.
- **Profile Management:** Admin panel for adding, editing, and deleting profiles.
- **Search and Filtering:** Filter profiles by name, location, or interests.
- **Responsive Design:** Mobile-friendly layout that works on various devices.
- **Error Handling:** Robust error handling for failed API requests and invalid inputs.
- **Loading Indicators:** Visual feedback when the application is fetching data.
- **Profile Details:** Detailed view for each profile with additional information.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/profile-mapper.git
   cd profile-mapper
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
profile-mapper/
  ├── src/
  │   ├── components/    # Reusable UI components
  │   ├── pages/         # Page components
  │   ├── services/      # API and data services
  │   ├── types/         # TypeScript interfaces
  │   ├── styles/        # CSS styles
  │   ├── hooks/         # Custom React hooks
  │   ├── assets/        # Static assets
  │   ├── App.tsx        # Main App component
  │   └── index.tsx      # Application entry point
  ├── package.json       # Project dependencies
  ├── tsconfig.json      # TypeScript configuration
  ├── webpack.config.js  # Webpack configuration
  └── README.md          # Project documentation
```

## Technologies Used

- **React:** UI library for building user interfaces
- **TypeScript:** Type-safe JavaScript
- **React Router:** For application routing
- **Leaflet/React-Leaflet:** For map functionality
- **CSS:** For styling the application
- **Webpack:** For bundling the application

## Usage

### User Interface

- The home page displays a list of profiles and a map
- Use the search filters to find specific profiles
- Click "Show on Map" to view a profile's location on the map
- Click "View Details" to see more information about a profile

### Admin Interface

- Navigate to the Admin page from the navbar
- View the list of existing profiles
- Add new profiles using the form
- Edit or delete existing profiles

## License

This project is licensed under the MIT License. 
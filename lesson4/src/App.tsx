import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Імпорт BrowserRouter
import GeolocationContainer from './components/GeolocationContainer';
import PersonList from './components/PersonList';
import PokemonDetails from './components/PokemonDetails'; // Імпорт компоненту з деталями покемона

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PersonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
      <GeolocationContainer />
    </Router>
  );
}

export default App;

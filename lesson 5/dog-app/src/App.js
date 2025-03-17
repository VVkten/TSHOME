// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogList from './DogList';
import DogDetails from './DogDetails';
import DogCreate from './DogCreate';
import DogEdit from './DogEdit';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DogList />} />
                <Route path="/:id" element={<DogDetails />} />
                <Route path="/create" element={<DogCreate />} />
                <Route path="/update/:id" element={<DogEdit />} />
            </Routes>
        </Router>
    );
};

export default App;

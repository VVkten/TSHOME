import React from 'react'
import { Route, Routes } from 'react-router';

import GeolocationContainer from './components/GeolocationContainer'
import PersonList from './components/PersonList'
import DogPage from './components/DogPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:dogId" element={<DogPage/>}>
          </Route>
          <Route path='/' element={<PersonList/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

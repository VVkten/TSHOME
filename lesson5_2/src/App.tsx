import React from 'react'
import { Route, Routes } from 'react-router';
import GeolocationContainer from './components/GeolocationContainer'
import PersonList from './components/PersonList'
import DogPage from './components/DogPage';
import CreateDog from './components/CreateDog';
import UpdateDog from './components/UpdateDog';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:Id" element={<DogPage/>}></Route>
          <Route path='/' element={<PersonList/>}></Route>
          <Route path="/create" element={<CreateDog/>}></Route>
          <Route path="/update/:id" element={<UpdateDog/>}></Route>
          /</Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

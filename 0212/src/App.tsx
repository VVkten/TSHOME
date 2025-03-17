import React from 'react'
import { Route, Routes } from 'react-router';

import GeolocationContainer from './components/GeolocationContainer'
import PersonList from './components/PersonList'
import DogPage from './components/DogPage';
import CreateDog from './components/CreateDog';
import { BrowserRouter } from 'react-router-dom';
import UpdateDog from './components/UpdateDog';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:dogId" element={<DogPage/>}>
          </Route>
          <Route path="/dogs/update/:dogId" element={<UpdateDog />}>
          </Route>
          <Route path='/' element={<PersonList/>}>
          </Route>
          <Route path='/login' element={<LoginForm/>}>
          </Route>
          <Route path="/signup" element={<RegisterForm />}> 
          </Route>
          <Route path='/create' element={<CreateDog/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

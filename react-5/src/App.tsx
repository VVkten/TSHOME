import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}>
          </Route>
          {/* <Route path="/:dogId" element={<DogPage/>}>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

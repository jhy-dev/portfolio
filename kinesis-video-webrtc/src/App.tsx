import React from 'react';
import { Route, Routes } from 'react-router';
import MasterPage from './page/MasterPage';
import ViewerPage from './page/ViewerPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/master' element={<MasterPage />} />
        <Route path='/viewer' element={<ViewerPage />} />
      </Routes>
    </div>
  );
}

export default App;

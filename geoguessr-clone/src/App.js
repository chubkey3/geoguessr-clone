import './App.css';
import Test from './Test';
import StreetView from './StreetView';
import { useState } from 'react';

function App() {

  const [coords, setCoords] = useState({lat: Math.random()*360 - 180, lng: Math.random()*360 - 180})

  return (
    <div className="App">
      <header className="App-header">
        <StreetView />
        <Test/>
      </header>
    </div>
  );
}

export default App;

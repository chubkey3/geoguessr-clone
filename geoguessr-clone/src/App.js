import './App.css';
import Test from './GuessMap';
import StreetView from './StreetView';
import Data from './data.json'
import { useState } from 'react';
import FullscreenMap from './FullscreenMap';

function App() {

  const [center, setCenter] = useState(Data[Math.floor(Math.random()*Data.length)])

  const [markers, setMarkers] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <StreetView center={center}/>
        <Test center={center} setParentMarkers={setMarkers}/>
        {(markers.length > 0) && <FullscreenMap markers={markers} setMarkers={setMarkers}/>}
        
      </header>
    </div>
  );
}

export default App;
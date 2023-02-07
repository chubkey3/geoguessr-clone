import './App.css';
import Test from './Test';
import StreetView from './StreetView';
import Data from './data.json'
import { useRef, useState } from 'react';
import { GoogleMap, StreetViewService } from '@react-google-maps/api';
import FullscreenMap from './FullscreenMap';

function App() {

  const center = Data[Math.floor(Math.random()*Data.length)]

  const [showFull, toggleFull] = useState(false)

  const mapGuessRef = useRef()

  const [markers, setMarkers] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <StreetView center={center}/>
        <Test center={center} toggleFull={toggleFull} ref={mapGuessRef} setParentMarkers={setMarkers}/>
        {showFull && <FullscreenMap markers={markers}/>}
        
      </header>
    </div>
  );
}

export default App;
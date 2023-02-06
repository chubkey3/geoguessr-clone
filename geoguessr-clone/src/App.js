import './App.css';
import Test from './Test';
import StreetView from './StreetView';
import Data from './data.json'
import { useState } from 'react';
import { GoogleMap, StreetViewService } from '@react-google-maps/api';

function App() {

  const [location, setLocation] = useState()

  /*
  const generateLocation = () => {
    const google = window.google;

    const center = {lat: 48.78345539425407, lng: -3.3389425277709965}
  
    const panoroma = new google.maps.StreetViewService()
    
    panoroma.getPanorama({location: center, radius: 10000000, preference: 'nearest'}, (data) => console.log(data))
  }
  */

  //const rndInt = Math.floor(Math.random() * 415)
  //const center = {lat: Number(Data.all[rndInt].lat), lng: Number(Data.all[rndInt].lng)}
 
  const center = {lat: 60.01523387136089, lng: 30.64817598554183}
  //console.log(rndInt)
  return (
    <div className="App">
      <header className="App-header">
        <StreetView center={center}/>
        <Test center={center}/>
      </header>
    </div>
  );
}

export default App;

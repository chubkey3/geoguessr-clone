import './App.css';
import Test from './Test';
import StreetView from './StreetView';
import Data from './data.json'
import { useState } from 'react';
import { GoogleMap, StreetViewService } from '@react-google-maps/api';

function App() {

  const center = Data[Math.floor(Math.random()*Data.length)]

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
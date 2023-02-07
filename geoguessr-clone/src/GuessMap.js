import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react'

const containerStyle = {
  width: '25vw',
  height: '25vw',
  zIndex: '2'
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false
}

function MyComponent({ center, setParentMarkers }) {
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null)

  useEffect(() => {
    if (markers[0]){
      setParentMarkers(markers)
    }
 
  }, [markers])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAa8AwVw9QKRS5AyGTih-iqcXgJ0ImcJ7o"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(1)

    setMap(map)

  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = (e) => {
    setMarkers((current) => [{ lat: e.latLng.lat(), lng: e.latLng.lng() }, center])
  }

  return isLoaded ? (
    <div className='guess-map-container'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: 0, lng: 0}}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={mapOptions}
        ref={mapRef}
        
      >
      </GoogleMap>
      <button className='guess-button'>{(markers.length === 0) ? 'Place your pin to guess' : 'Guess'}</button>
    </div>
  ) : <></>
}

export default React.memo(MyComponent)
import { GoogleMap, Marker, StreetViewPanorama, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react'
import randomStreetView from 'random-streetview'

const containerStyle = {
    width: '100vw',
    height: '100vh',
    zIndex: '1'
  };

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  minZoom: 2,
  streetViewControl: false
}

const StreetViewOptions = {
    fullscreenControl: false,
    addressControl: false,
    disableDefaultUI: false,
    showRoadLabels: false
}


const center = {
    lat: Math.round((Math.random()*360 - 180) * 1000)/1000,
    lng: Math.round((Math.random()*360 - 180) * 1000)/1000
}


function MyComponent() {

  const [markers, setMarkers] = useState([]);

console.log(center)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAa8AwVw9QKRS5AyGTih-iqcXgJ0ImcJ7o"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = (e) => {
    setMarkers((current) => [{lat: e.latLng.lat(), lng: e.latLng.lng()}])
  }
  
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={mapOptions}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {markers.map((marker) => (
          <Marker position={{lat: marker.lat, lng: marker.lng}}/>
        ))}
        <StreetViewPanorama
        position={center}
        visible={true}
        options={StreetViewOptions}
        />
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
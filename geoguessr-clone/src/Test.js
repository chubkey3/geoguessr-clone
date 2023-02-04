import { GoogleMap, Marker, StreetViewPanorama, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'

const containerStyle = {
  width: '25vw',
  height: '25vw',
  position: 'absolute',
  bottom: 0,
  right: 0,
  zIndex: '2'
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  minZoom: 2,
  streetViewControl: false
}

const center = {
  lat: -3.745,
  lng: -38.523
};

function MyComponent() {

  const [markers, setMarkers] = useState([]);
  /*
  useEffect(() => {
    console.log(center, markers[0])
  }, [markers])
  */

  document.body.onkeyup = function(e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32){
      alert(center)
    }
  }

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
        
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
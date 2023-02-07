import { GoogleMap, Marker, StreetViewPanorama, StreetViewService, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react'
import Data from './data.json'

const containerStyle = {
    width: '100vw',
    height: '100vh',
    zIndex: '1',
    position: 'absolute'
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
    showRoadLabels: false,
    enableCloseButton: false
}


function MyComponent({center}) {

  const [markers, setMarkers] = useState([]);
  
  const [location, setLocation] = useState();

  useEffect(() => {
    console.log(location)
  }, [location])

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

  const testOnLoad = (streetViewService) => {
    
    const panoroma = new window.google.maps.StreetViewService()
    /*
    streetViewService.getPanorama({
      location: center,
      radius: 10000000
    }, (data, status) => console.log(
      "StreetViewService results",
      { data, status }
    ))
    */
   panoroma.getPanorama({location: center}, (data) => setLocation({lat: data.location.latLng.lat(), lng: data.location.latLng.lng()}))

  };
  
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
        position={location}
        visible={true}
        options={StreetViewOptions}
        enableCloseButton={false}
        />
        <StreetViewService
          onLoad={testOnLoad}
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)
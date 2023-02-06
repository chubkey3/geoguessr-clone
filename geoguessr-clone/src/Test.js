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


function MyComponent({center}) {

  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState();

  useEffect(() => {
    if (center && markers[0]){
      console.log(getDistance(center, markers[0]) + "km away")
    } 
    
  }, [markers])

  var rad = function(x) {
    return x * Math.PI / 180;
  };
  
  var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    setDistance(Math.floor(d/1000))
  };

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
    const bounds = new window.google.maps.LatLngBounds({lat: 0, lng: 0});
    map.fitBounds(bounds);
    
    
    map.setZoom(2)
    setMap(map)
    
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = (e) => {
    setMarkers((current) => [{lat: e.latLng.lat(), lng: e.latLng.lng()}])
  }

  return isLoaded ? (
    <>
      {distance && <text className='distance-header'>{distance + 'km'}</text>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={2}
        center={center}
        
        onUnmount={onUnmount}
        onClick={onMapClick}
        options={mapOptions}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {markers.map((marker) => (
          <Marker position={{lat: marker.lat, lng: marker.lng}}/>
        ))}
        
      </GoogleMap>

    </>
  ) : <></>
}

export default React.memo(MyComponent)
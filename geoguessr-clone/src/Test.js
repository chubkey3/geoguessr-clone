import { GoogleMap, Marker, StreetViewPanorama, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { withGoogleMap } from '@react-google-maps/api'

const containerStyle = {
  width: '25vw',
  height: '25vw',
  zIndex: '2',
  hover: '{transform: scale(1.2)}'
};

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false
}

//https://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers

function MyComponent({ center, toggleFull, setParentMarkers }) {
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState();
  const mapRef = useRef(null)

  

  useEffect(() => {
    if (isLoaded) {
      var bounds = new window.google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i])
      }
            
      if (mapRef.current) {
        //map.setCenter(center)
        map.fitBounds(bounds)
        //map.setZoom(map.getZoom() - 1)
        toggleFull(prevState => !prevState);
      }

      
    }

    if (markers[0]){
      getDistance(markers[0], markers[1])
      setParentMarkers(markers)
    }
    

    //reload page
    /*
    if (markers.length > 0 ){
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    */
  }, [markers])

  var rad = function (x) {
    return x * Math.PI / 180;
  };

  var getDistance = function (p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    setDistance(Math.floor(d / 1000))
  };

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
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
    //const bounds = new window.google.maps.LatLngBounds({ lat: 0, lng: 0 });
    //map.fitBounds(bounds);

    map.setZoom(1)

    setMap(map)

  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = (e) => {
    setMarkers((current) => [{ lat: e.latLng.lat(), lng: e.latLng.lng() }, center])
  }

  //useImperativeHandle(ref, () => ({getMarkers: () => {return markers}}), [markers])

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
        { /* Child components, such as markers, info windows, etc. */}
        {markers.map((marker) => (
          <Marker position={{ lat: marker.lat, lng: marker.lng }} />
        ))}

      </GoogleMap>
      <button className='guess-button'>{(markers.length === 0) ? 'Place your pin to guess' : 'Guess'}</button>
    </div>
  ) : <></>
}

export default React.memo(MyComponent)
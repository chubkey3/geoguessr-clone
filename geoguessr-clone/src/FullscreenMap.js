import React from 'react'
import { GoogleMap, Marker, useJsApiLoader, Polyline } from '@react-google-maps/api';

const containerStyle = {
  width: '50vw',
  height: '50vh',
  zIndex: '5',

};



const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false
  }

const distance = 500;

function FullscreenMap({markers}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAa8AwVw9QKRS5AyGTih-iqcXgJ0ImcJ7o"
  })

  const [map, setMap] = React.useState(null)
  const [distance, setDistance] = React.useState()


  React.useEffect(() => {
    if (isLoaded) {
      var bounds = new window.google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i])
      }
            
    
    //map.setCenter(markers[1])
    //setTimeout(() => {map.fitBounds(bounds); alert('hi')}, 2000)
    
    //map.setZoom(map.getZoom() - 1)
    
    map.fitBounds(bounds)

      
    }
    //console.log('hi')

    if (markers[0]){
      getDistance(markers[0], markers[1])
    }
    

    
  }, [map, markers])

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


  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const path = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
  ];

  
  return isLoaded ? (
    <div className={'overlay'}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markers[1]}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        { /* Child components, such as markers, info windows, etc. */}
        {markers.map((marker) => (
          <Marker animation={window.google.maps.Animation.DROP} icon={{url: "marker.png", scale: 50}} scaledSize={new window.google.maps.Size(50, 50)} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
        <Polyline path={markers}   strokeColor={"#FF0000"} strokeOpacity={1.0} strokeWeight={2}/>
        <></>
      </GoogleMap>
      <text>You are {distance}km Away.</text>
      <button onClick={() => {window.location.reload()}}>Guess Again</button>
    </div>
  ) : <></>
}

export default React.memo(FullscreenMap)
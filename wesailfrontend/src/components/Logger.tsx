import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

const Logger = () => {
  const [longitude, setLongitude] = useState(0)
  const [latitude, setLatitude] = useState(0)
  const [updated, setUpdated] = useState(0)
  const [logging, setLogging] = useState(true)

  function MyComponent() {
    const map = useMap()
    if (logging){
      map.flyTo([latitude, longitude], 15)
    }
    return null
  }

  const success = (pos: GeolocationPosition) => {
    setLatitude(pos.coords.latitude)
    setLongitude(pos.coords.longitude)
    setUpdated(pos.timestamp)
  }
  const errorMessage = (e: GeolocationPositionError) => {console.log(e)}

  navigator.geolocation.watchPosition(success, errorMessage);

  return (
    <div className="main">
      <div className="single_content">
        <MapContainer center={[latitude,longitude]} zoom={15} scrollWheelZoom={false}>
          <MyComponent />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <div>
          <button onClick={() => logging ? setLogging(false): setLogging(true)}>{logging ? <>Start</>: <>Stop</>} logging</button>
        </div>
      </div>
    </div>
  )
}

export default Logger
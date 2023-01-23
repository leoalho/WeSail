import { useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON} from 'react-leaflet'
import testRoute from '../data/testRoute.json'

const Logger = () => {
  const [longitude, setLongitude] = useState(24.9)
  const [latitude, setLatitude] = useState(60.19)
  const [updated, setUpdated] = useState(0)
  const [logging, setLogging] = useState(false)

  console.log(typeof testRoute)

  interface myComponent {
    logging: boolean,
    setLogging: Function
  }

  function MyComponent({logging}: myComponent) {
    const [first, setFirst] = useState(true)
    const map = useMap()
    if (latitude != 60.19 && longitude != 24.9 && first){
      map.flyTo([latitude, longitude], 15)
      setFirst(false)
    }
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
          <MyComponent logging={logging} setLogging={setLogging}/>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <GeoJSON key="testitesti" data={testRoute}/>
        </MapContainer>
        <div>
          <button onClick={() => logging ? setLogging(false): setLogging(true)}>{logging ? <>Stop</>: <>Start</>} logging</button>
        </div>
      </div>
    </div>
  )
}

export default Logger
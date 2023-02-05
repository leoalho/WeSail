import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet'

const errorMessage = (e: GeolocationPositionError) => {console.log(e)}

const Logger = () => {
  const [longitude, setLongitude] = useState(24.9)
  const [latitude, setLatitude] = useState(60.19)
  const [updated, setUpdated] = useState(0)
  const [speed, setSpeed] = useState<(number | null)>(0)
  const [heading, setHeading] = useState<(number | null)>(0)
  const [logging, setLogging] = useState(false)
  const [logActive, setLogActive] = useState(false)
  const [route, setRoute] = useState<[number, number][]>([])
  const [geoId, setGeoId] = useState(0)

  const initSuccess = (pos: GeolocationPosition) => {
    setLatitude(pos.coords.latitude)
    setLongitude(pos.coords.longitude)    
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(initSuccess, errorMessage)
  }, [])

  const testi = {
    "type": "Feature" as const,
    "geometry": {
      "type": "LineString",
      "coordinates": route
    }
  }

  interface myComponent {
    logging: boolean,
    setLogging: React.Dispatch<React.SetStateAction<boolean>>
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
    setSpeed(pos.coords.speed)
    setHeading(pos.coords.heading)
    setRoute([...route, [latitude, longitude]])
  }

  const startLogging = () => {
    setLogActive(true)
    setLogging(true)
    setGeoId(navigator.geolocation.watchPosition(success, errorMessage))
  }
  
  const pauseLogging = () => {
    setLogging(false)
    navigator.geolocation.clearWatch(geoId)
  }

  const continueLogging = () => {
    setLogging(true)
    setGeoId(navigator.geolocation.watchPosition(success, errorMessage))
  }

  /*
  if (logging && logActive){
    navigator.geolocation.watchPosition(success, errorMessage)
  }
  */
  
  console.log(testi)

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
              This is you.
            </Popup>
          </Marker>
          <Polyline positions={route} />
        </MapContainer>
        <div>
          {logActive
            ? <><button onClick={() => logging ? pauseLogging(): continueLogging()}>{logging ? <>Pause</>: <>Continue</>}</button>
             latitude: {latitude}, longitude: {longitude} {speed && <>, speed {speed}</>} {heading && <>, {heading}</>} <br/>
             last updated {new Date(updated).toISOString()}</>
            : <><button onClick={startLogging}>Start</button><Link to="/newLog">Create log entry without location</Link></>
          }
          {(logActive && !logging) && <button>Submit</button>}
        </div>
      </div>
    </div>
  )
}

export default Logger
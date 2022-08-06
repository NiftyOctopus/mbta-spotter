import './App.css'
import { useEffect, useState } from 'react'

import SelectRoute from './SelectRoute'
import Vehicle     from './Vehicle'
import Stop        from './Stop'

const API = 'https://api-v3.mbta.com/'


function App() {
    const [routeList, setRouteList] = useState([])

    useEffect(() => {
        const getRoutes = async () => {
            const res  = await fetch(API + 'routes?filter[type]=0,1,2')
            const data = await res.json()
            setRouteList(data.data)
        }
        getRoutes()
    }, [])


    const [route, setRoute] = useState('CR-Providence')

    const handleRouteChange = (selected) => {
        setRoute(selected)
    }


    const [stops, setStops] = useState([])

    useEffect(() => {
        const getStops = async () => {
            const res  = await fetch(API + 'stops?filter[route]=' + route)
            const data = await res.json()
            setStops(data.data)
            console.log(data.data)
        }
        getStops()
    }, [route])


    const [scale, setScale] = useState({ lat: {}, long: {} })

    useEffect(() => {
        let lat  = []
        let long = []
        let attr

        for(let stop of stops) {
            attr = stop.attributes
            lat.push(attr.latitude)
            long.push(attr.longitude)
        }
        
        setScale({
            lat:  getScale(lat),
            long: getScale(long)
        })
    }, [stops])


    const initScreen = { min: 0, max: 100, rng: 100 }
    const [screen, setScreen] = useState({ x: initScreen, y: initScreen })
    
    const getScreen = () => {
        const width  = window.innerWidth
        const height = window.innerHeight
        const size   = Math.min(width, height)

        const dims   = { min: 0, max: size, rng: size }
        const style  = { width: size, height: size }

        return { x: dims, y: dims, style }
    }
    
    useEffect(() => {
        setScreen(getScreen())

        window.addEventListener('resize', () => {
            setScreen(getScreen())
        })
    }, [])


    const [vehicles, setVehicles] = useState([])

    const getVehicles = async () => {
        const res  = await fetch(API + 'vehicles?filter[route]=' + route)
        const data = await res.json()
        setVehicles(data.data)
    }

    useEffect(() => {
        getVehicles()
    }, [route])


    const getCoord = (screen, scale, value_a, flip=false) => {
        const offset_a = value_a    - scale.min
        const portion  = offset_a   / scale.rng
        //const offset_b = portion    * screen.rng
        //const value_b  = screen.min + offset_b

        //const coord = flip ? screen.max - offset_b : value_b
        //return coord
        const frac = flip ? 1 - portion : portion
        return (frac * 100) + '%'
    }


    return (
        <div className='App'>
            <div><button onClick={getVehicles}>Refresh</button></div>
            
            <SelectRoute
                route={route}
                routeList={routeList}
                onRouteChange={handleRouteChange}
            />

            {/* <div className='stops'> */}
                { stops.map((stop) => {
                    return (
                        <Stop
                            key={stop.id}
                            {...stop}
                            getCoord={getCoord}
                            scale={scale}
                            screen={screen}
                        />
                    )
                })}
            {/* </div> */}

            {/* <div className='vehicles'> */}
                { vehicles.map((vehicle) => {
                    return (
                        <Vehicle
                            key={vehicle.id}
                            {...vehicle}
                            getCoord={getCoord}
                            scale={scale}
                            screen={screen}
                        />
                    )
                })}
            {/* </div> */}
        </div>
    )
}

export default App


function getScale(data) {
    let min = Math.min(...data)
    let max = Math.max(...data)
    let rng = max - min

    const margin = rng * 0.1

    min = min - margin
    max = max + margin
    rng = rng + margin * 2

    return { min, max, rng }
}

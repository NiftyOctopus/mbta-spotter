import './Vehicle.css'
import { useEffect, useState } from 'react'

import VehicleLabel from './VehicleLabel'


function Vehicle(props) {
    const [coords, setCoords] = useState({ left: 0, top: 0 })

    useEffect(() => {
        const screen = props.screen
        const scale  = props.scale
        const lat    = props.attributes.latitude
        const long   = props.attributes.longitude

        let left = props.getCoord(screen.x, scale.long, long)
        let top  = props.getCoord(screen.y, scale.lat,  lat, true)
        
        if(!left) left = 0
        if(!top)  top  = 0

        setCoords({ left, top })

    }, [
        props.screen,
        props.scale,
        props.attributes.latitude,
        props.attributes.longitude
    ])


    const [angle, setAngle] = useState({ transform: 'rotate(0deg)' })

    useEffect(() => {
        const bearing = props.attributes.bearing
        setAngle({ transform: 'rotate(' + bearing + 'deg)' })
    }, [props.attributes.bearing])


    const [stopID, setStopID] = useState('None')

    useEffect(() => {
        const stop = props.relationships.stop
        setStopID(stop ? stop.data.id : 'None')
    }, [props.relationships.stop])


    const [tripID, setTripID] = useState('None')

    useEffect(() => {
        const trip = props.relationships.trip
        setTripID(trip ? trip.data.id : 'None')
    }, [props.relationships.trip])


    const [hover, setHover] = useState(false)
    const [focus, setFocus] = useState(false)

    return (
        <div
            className='Vehicle'
            style={coords}
            onMouseEnter={() => !focus && setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setFocus(!focus)}>

            <div className='marker' style={angle}></div>
            
            { (hover || focus) &&
                <VehicleLabel
                    id={props.id}
                    trip={tripID}
                    status={props.attributes.current_status}
                    speed={props.attributes.speed}
                    stop={stopID}
                />
            }
        </div>
    )
}

export default Vehicle

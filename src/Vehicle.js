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

        let left = props.getCoord(screen.x, scale.lat,  lat)
        let top  = props.getCoord(screen.y, scale.long, long, true)
        
        if(!left) left = 0
        if(!top)  top  = 0

        setCoords({ left, top })

    }, [props.screen, props.scale, props.attributes.latitude, props.attributes.longitude])

    const [angle, setAngle] = useState({ transform: 'rotate(0deg)' })

    useEffect(() => {
        const bearing = props.attributes.bearing
        setAngle({ transform: 'rotate(' + bearing + 'deg)' })
    }, [props.attributes.bearing])

    return (
        <div className='Vehicle' style={coords}>
            <div className='marker' style={angle}></div>
            <VehicleLabel
                id={props.id}
                status={props.attributes.current_status}
                stop={props.relationships.stop.data.id}
            />
        </div>
    )
}

export default Vehicle

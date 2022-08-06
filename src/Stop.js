import './Stop.css'
import { useEffect, useState } from 'react'

import StopLabel from './StopLabel'


function Stop(props) {
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


    return (
        <div className='Stop' style={coords}>
            <div className='marker'></div>
            <StopLabel
                name={props.attributes.name}
            />
        </div>
    )
}

export default Stop

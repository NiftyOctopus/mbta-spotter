import './VehicleLabel.css'

function VehicleLabel(props) {
    return (
        <div className='VehicleLabel'>
            <div>Coach {props.id}</div>
            <div>Trip {props.trip}</div>
            <div>{props.status}</div>
            <div>{props.stop}</div>
            <div>{props.speed}</div>
        </div>
    )
}

export default VehicleLabel

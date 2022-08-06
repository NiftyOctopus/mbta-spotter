import './VehicleLabel.css'

function VehicleLabel(props) {
    return (
        <div className='VehicleLabel'>
            <div>{props.id}</div>
            <div>{props.status}</div>
            <div>{props.stop}</div>
            <div>{props.speed}</div>
        </div>
    )
}

export default VehicleLabel

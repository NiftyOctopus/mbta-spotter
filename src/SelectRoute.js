
function SelectRoute(props) {
    const handleChange = ({ target }) => {
        props.onRouteChange(target.value)
    }

    return (
        <div className='SelectRoute'>
            <select value={props.route} onChange={handleChange}>
                { props.routeList.map(route => {
                    return <option key={route.id}>{route.id}</option>
                })}
            </select>
        </div>
    )
}

export default SelectRoute

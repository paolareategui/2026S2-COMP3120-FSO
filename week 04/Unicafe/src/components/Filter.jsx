const Filter = (props) => {
    
    return (
        <div>filter shown with <input value={props.filterText} onChange={(e) => props.setFilterText(e.target.value)}></input></div>

    )
}

export default Filter
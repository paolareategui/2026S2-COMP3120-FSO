const Persons = (props) => {


  const personsToDisplay = props.persons.filter(p => p.name.toLowerCase().includes(props.filterText))
    
    return (
      personsToDisplay.map((n) => (
        <p key={n.name}>{n.name} {n.number}</p>
      ))
    )
}

export default Persons
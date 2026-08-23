const Persons = (props) => {


  const personsToDisplay = props.persons.filter(p => p.name.toLowerCase().includes(props.filterText))
  return (
    personsToDisplay.map((n) => (
      <div key={n.id}>
        <span >{n.name} {n.number} {n.id}</span> <button onClick={() => props.handleDelete(n.id)}>delete</button>
      </div>
    ))
  )
}

export default Persons
import Person from "./Person"

const Persons = (props) => {
    const personsToShow = props.searchName.length === 0
        ? props.persons
        : props.persons.filter(person => person.name.toLowerCase().includes(props.searchName.toLowerCase()))

    return (
        <div>
            {personsToShow.map(person => {
                return (
                    <Person key={person.id} name={person.name}
                        number={person.number}
                        handleDelete={() => props.callDelete(person.id)}
                    />

                )
            }
            )}
        </div>
    )
}

export default Persons
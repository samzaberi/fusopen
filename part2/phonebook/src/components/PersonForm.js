const PersonForm = (props) => {

    return (
        <form onSubmit={props.handleAddClick}>
            <div>
                name: <input value={props.name} onChange={props.onNameChange} />
                <br />
            number: <input value={props.number} onChange={props.onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;
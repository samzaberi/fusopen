const Person = (props) => {
    const onDeleteClick = () => {
        if (window.confirm(`Delete ${props.name} ?`)) {
            props.handleDelete()
        }
    }
    return (
        <div>
            {props.name} {props.number} <button onClick={onDeleteClick}>delete</button>
        </div>
    )
}

export default Person
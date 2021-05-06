const Filter = (props) => {
    return (
        <div>
            filter shown with: <input value={props.searchName} onChange={props.onSearchChange} />
        </div>
    )
}

export default Filter
const Notification = ({ message, classn }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={classn}>
            {message}
        </div>
    )
}

export default Notification
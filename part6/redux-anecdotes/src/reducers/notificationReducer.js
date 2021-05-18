
const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data

        default:
            return state
    }
}

export const setNotification = (content, timer) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: null
            })
        }, timer);

    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: null
    }

}

export default notificationReducer
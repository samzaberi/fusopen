
const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VOTE_NOTIFICATION':
            return action.data
        case 'SET_CREATE_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setVoteNotification = (content) => {
    return {
        type: 'SET_VOTE_NOTIFICATION',
        data: `you voted ${content}`
    }
}

export const setCreateAnecNotification = (content) => {
    return {
        type: 'SET_CREATE_NOTIFICATION',
        data: `created anecdote ${content}`
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
        data: null
    }

}

export default notificationReducer
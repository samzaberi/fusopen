import anecdotesService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(anec =>
        anec.id !== id ? anec : action.data
      )

    case 'ADD_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })

  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: (anecdote.votes + 1)
    }

    try {
      await anecdotesService.updateVotes(anecdote.id, newAnecdote)
    } catch (error) {
      console.error(error.message)
    }

    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = {
      content,
      id: getId(),
      votes: 0
    }
    const result = await anecdotesService.create(anecdote)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: result
    })

  }
}

export default anecdoteReducer
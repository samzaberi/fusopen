import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()


    const voteAndNotify = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5000))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAndNotify(anecdote)}>
                            vote
                            </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes
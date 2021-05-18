import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setVoteNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
    }

    const voteAndNotify = (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setVoteNotification(content))
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
                        <button onClick={() => voteAndNotify(anecdote.id, anecdote.content)}>
                            vote
                            </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes
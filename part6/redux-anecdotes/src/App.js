import React from 'react'
import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'
import { initializeNotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App

import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name,
    born,
    bookCount
  }
}
`

const EDIT_AUTHOR = gql`
mutation updateAuthor($author:String!,$born:Int!){
  editAuthor(
    name:$author,
    setBornTo:$born
  ){
    name,
    born
  }
}
`

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { author, born: Number(born) } })

    setAuthor('')
    setBorn('')
  }



  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Author
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
            {result.data.allAuthors.map(a =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors

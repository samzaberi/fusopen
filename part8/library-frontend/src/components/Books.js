import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    author{
      name
    },
    published,
    genres
  }
}
`

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  const [origBooks, setOrigBooks] = useState([])

  const result = useQuery(ALL_BOOKS)
  const genres = new Set()

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setOrigBooks(result.data.allBooks)

    }

  }, [result.data])


  const onGenreSelect = () => {
    console.log("genre", genre)
    if (genre === "all") {
      setBooks(origBooks)
    } else {
      setBooks(origBooks.filter(b => b.genres.includes(genre)))
    }

  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  origBooks.forEach(b => {
    b.genres.forEach(g => genres.add(g))
  })
  // console.log(genres)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {/* {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )} */}
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>genres</p>
      <select value={genre} onChange={(event) => setGenre(event.target.value)}>
        {/* <option>select</option> */}
        <option value="all">all</option>
        {Array.from(genres).map(g =>
          <option value={g} key={g}>{g}</option>
        )}
      </select>
      <button onClick={() => onGenreSelect()}>filter</button>


    </div>
  )
}

export default Books
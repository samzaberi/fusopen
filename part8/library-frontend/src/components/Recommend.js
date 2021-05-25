import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'


const BOOKS_GENRE = gql`
query booksGenre($genre:String!) {
    allBooks(genre:$genre) {
      title,
      author{
          name
      },
      published
    }
}
`

const CURRENT_USER = gql`
query {
    me{
        username,
        favouriteGenre
    }
}
`

const Recommend = (props) => {

    const [recs, setRecs] = useState([])
    const [genre, setGenre] = useState('')

    const { data: currUser } = useQuery(CURRENT_USER)
    const favGenre = currUser?.me?.favouriteGenre
    const { data: userRecs } = useQuery(BOOKS_GENRE,
        {
            skip: !favGenre,
            variables: { genre: favGenre }
        }
    )

    useEffect(() => {
        if (currUser) {
            setGenre(currUser.me.favouriteGenre)

        }
        if (userRecs) {
            setRecs(userRecs.allBooks)
        }
    }, [currUser, userRecs])


    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>based on your favourite genre {genre} </p>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recs.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
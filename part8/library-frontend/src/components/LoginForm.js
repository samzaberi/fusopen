import React, { useEffect, useState } from "react"
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
mutation loginUser($username:String!,$password:String!){
    login(
        username: $username,
        password: $password
      ){
          value
      }
}
`

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [pswd, setPswd] = useState('')

    const [loginUser, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        console.log("username", username)
        await loginUser({
            variables: {
                username,
                password: pswd
            }
        })
        props.setPage('authors')

        setUsername('')
        setPswd('')
    }

    if (!props.show) {
        return null
    }
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
          <input
                        type="text"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
          <input
                        type="password"
                        value={pswd}
                        onChange={({ target }) => setPswd(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm
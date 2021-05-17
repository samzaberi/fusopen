import { useState } from 'react'

const LoginForm = ({ doLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onNameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPswdChange = (event) => {
        setPassword(event.target.value)
    }

    const sendLogin = (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        doLogin({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={sendLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={onNameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={onPswdChange}
                        id="pswd"
                    />
                </div>
                <button type="submit" id="login-btn">login</button>
            </form>
        </div>
    )
}

export default LoginForm
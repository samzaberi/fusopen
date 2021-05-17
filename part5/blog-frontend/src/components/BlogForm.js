import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const onAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    const onUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')

    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={addBlog}>
                <div>
                    title:
              <input
                        type="text"
                        value={title}
                        name="title"
                        id="title"
                        onChange={onTitleChange}
                    />
                </div>
                <div>
                    author:
              <input
                        type="text"
                        value={author}
                        name="author"
                        id="author"
                        onChange={onAuthorChange}
                    />
                </div>
                <div>
                    url:
              <input
                        type="text"
                        value={url}
                        name="url"
                        id="url"
                        onChange={onUrlChange}
                    />
                </div>
                <button type="submit" id="create">create</button>
            </form>
        </div>
    )
}

export default BlogForm
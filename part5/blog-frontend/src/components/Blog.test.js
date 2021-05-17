import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('blog component renders title, author on initial load', () => {
    const blog = {
        tile: 'spinning kick',
        author: 'chuck norris',
        url: 'zeurl',
        likes: 9
    }
    const user = {
        username: 'saitama',
        name: 'saitama',
        id: '609ba7e085089f2f782c9d82'
    }

    const component = render(
        <Blog blog={blog}
            user={user}
        />
    )

    const title = component.container.querySelector('.blogtitle')
    expect(title).toBeDefined()




})
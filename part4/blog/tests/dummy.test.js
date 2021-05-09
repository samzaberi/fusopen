const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
describe('authors with most of a given field', () => {
    const blogs = [
        {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        },
        {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5

        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "First class tests",
            author: "Robert C. Martin",
            likes: 10
        },
        {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            likes: 0
        },
        {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2
        }
    ]

    test('mostBlogs returns author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })

    test('mostLikes returns author with most likes', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})


describe('likes field', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
        {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7
        },
        {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5

        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "First class tests",
            author: "Robert C. Martin",
            likes: 10
        },
        {
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            likes: 0
        },
        {
            title: "Type wars",
            author: "Robert C. Martin",
            likes: 2
        }
    ]


    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of larger list is correct', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

    test('favourite blog', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})


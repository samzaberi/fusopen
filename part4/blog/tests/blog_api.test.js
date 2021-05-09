const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {

        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,

    },
    {

        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,

    },
    {

        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,

    },
    {

        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,

    },
    {

        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,

    }
]

beforeEach(async () => {
    try {
        await Blog.deleteMany()
        await Blog.insertMany(initialBlogs)
    } catch (error) {
        console.error(error.message)
    }

})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs returned are correct number', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('blog posts unique identifier is id property', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body[0]
    expect(content.id).toBeDefined()
})

test('post request creates new blog post', async () => {
    const newBlog = {
        title: "bob eats",
        author: "archer",
        url: "theurl",
        likes: 4
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')

    const contentArr = response.body.filter(b => b.title === newBlog.title)
    let content = contentArr[0]
    delete content.id

    expect(response.body).toHaveLength(7)
    expect(content.toString()).toBe(newBlog.toString())
})

test('if likes missing default to 0', async () => {
    const newBlog = {
        title: "bob eats",
        author: "archer",
        url: "theurl"
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')

    const contentArr = response.body.filter(b => b.title === newBlog.title)
    let content = contentArr[0]
    expect(content.likes).toBe(0)

})

test('if title and url missing request fails', async () => {
    const newBlog = {
        author: "archer",
        likes: 9
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})
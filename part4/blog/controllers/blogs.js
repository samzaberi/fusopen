const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user')
    response.json(result)

})

blogsRouter.post('/', async (request, response) => {
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0,
        user: user._id
    })
    try {
        const result = await blog.save()

        user.blogs = user.blogs.concat(result._id)
        await user.save()

        response.status(201).json(result)

    } catch (error) {
        if (error.name === 'ValidationError') {
            return response.status(400).send({ error: error.message })
        }
        console.error(error.message)
    }

})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    try {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        console.error(error.message)
    }


})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(result)

})

module.exports = blogsRouter
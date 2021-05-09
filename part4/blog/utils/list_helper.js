const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // console.log(blogs)
    let sum = 0
    blogs.forEach(element => {
        sum += element.likes
    })
    return sum
}

const favouriteBlog = (blogs) => {
    let maxLikes = blogs[0].likes
    let index = 0
    blogs.forEach((b, i) => {
        let currLikes = b.likes
        if (currLikes >= maxLikes) {
            maxLikes = currLikes
            index = i
        }
    })
    return blogs[index]
}

const getAuthorsBlogCount = (blogs) => {
    const authors = blogs.map(b => b.author)
    const uniqAuthors = _.uniq(authors)
    // console.log(uniqAuthors)
    const authorsBlogCount = uniqAuthors.map(a => {
        const authorBlogs = _.filter(blogs, ['author', a])
        // console.log(authorBlogs)
        const numBlogs = authorBlogs.length
        // console.log('numblogs', numBlogs)
        const authorCount = {
            author: a,
            blogs: numBlogs
        }
        return authorCount
    })
    // console.log(authorsBlogCount)
    return authorsBlogCount
}

const getAuthorsLikesCount = (blogs) => {
    const authors = blogs.map(b => b.author)
    const uniqAuthors = _.uniq(authors)
    const authorsLikesCount = uniqAuthors.map(a => {
        const authorLikes = _.filter(blogs, ['author', a])
        const numLikes = _.reduce(authorLikes, (prev, curr) => {
            if (curr.author === a) {
                return prev += curr.likes
            }
        }, 0)
        const authorCount = {
            author: a,
            likes: numLikes
        }
        return authorCount
    })
    // console.log(authorsLikesCount)
    return authorsLikesCount
}

const mostBlogs = (blogs) => {
    const authorBlogs = getAuthorsBlogCount(blogs)
    const max = authorBlogs.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })
    return max
}

const mostLikes = (blogs) => {
    const authorLikes = getAuthorsLikesCount(blogs)
    const max = authorLikes.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
    return max
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]



const JWT_SECRET = 'standalonecomplex'

console.log('connecting to database')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const typeDefs = gql`
type Author {
    name:String!
    id:ID!
    born:Int
    bookCount:Int
}
type Book {
    title:String!
    published:Int!
    author:Author!
    id:ID!
    genres:[String!]!
}
type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author:String,genre:String):[Book]
    allAuthors:[Author!]!
    me:User
  }
type Mutation {
    addBook(
        title: String!,
        author:  String!,
        published: Int!,
        genres: [String!]!
    ): Book
    editAuthor(name:String!,born:Int!):Author
    addAuthor(
        name:String!,
        born:Int
    ):Author
    createUser(
        username: String!
        favouriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
}
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            const books = await Book.find({}).populate('author')
            // console.log(books)
            // console.log("author name", books[0].author.name)
            if (args.genre && args.author) {
                return books.filter(b => b.genres.includes(args.genre) && b.author.name === args.author)
            } else if (args.genre) {
                return books.filter(b => b.genres.includes(args.genre))
            } else if (args.author) {
                return books.filter(b => b.author.name === args.author)
            }
            return books

        },
        allAuthors: async () => {
            const response = await Author.find({})
            // console.log(response)
            const result = response.map(async a => {
                let count = await Book.collection.countDocuments({ author: a._id })
                let author = {
                    name: a.name,
                    born: a.born ? a.born : null,
                    bookCount: count
                }
                // console.log(author)
                return author
            })

            return result
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                return "token missing or invalid"
            }
            const author = await Author.findOne({ name: args.author })
            let bookDetails = {}
            if (author) {
                bookDetails = {
                    title: args.title,
                    published: args.published,
                    author: author._id,
                    genres: args.genres
                }
            } else {
                const author = new Author({ "name": args.author })
                const result = await author.save()
                bookDetails = {
                    title: args.title,
                    published: args.published,
                    author: result._id,
                    genres: args.genres
                }
            }

            const book = new Book(bookDetails)
            try {
                await book.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                return "token missing or invalid"
            }

            try {
                const result = await Author.findOneAndUpdate({ name: args.name }, { born: args.born }, { new: true })
                return result
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }


        },
        addAuthor: async (root, args) => {
            try {
                const author = new Author({ ...args })
                const result = await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username,
                "favouriteGenre": args.favouriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})

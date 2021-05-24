const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
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
  type Query {
    bookCount:Int!
    authorCount:Int!
    allBooks(author:String,genre:String):[Book]
    allAuthors:[Author!]!
  }
type Mutation {
    addBook(
        title: String!,
        name:  String!,
        born:Int
        published: Int!,
        genres: [String!]!
    ): Book
    editAuthor(name:String!,born:Int!):Author
    addAuthor(
        name:String!,
        born:Int
    ):Author
}
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (args.genre && args.author) {
                return books.filter(b => b.author === args.author && b.genres.includes(args.genre))
            } else if (args.genre) {
                return books.filter(b => b.genres.includes(args.genre))
            } else if (args.author) {
                return books.filter(b => b.author === args.author)
            } else {
                return books
            }


        },
        allAuthors: async () => {
            const result = await Author.find({})
            return result
            // const result = authors.map(author => {
            //     let count = books.reduce((a, b) => b.author === author.name ? a += 1 : a, 0)
            //     return {
            //         ...author,
            //         bookCount: count
            //     }
            // })
            // return result
        }
    },
    Mutation: {
        addBook: async (root, args) => {
            const book = new Book({ ...args })
            // const author = new Author({ "name": args.name })
            // author.save()
            try {
                await book.save()

            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
        editAuthor: async (root, args) => {
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

        }
    }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
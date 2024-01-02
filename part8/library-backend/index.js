const config = require('./utils/config')
const mongoose = require('mongoose')

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoUrl = config.MONGODB_URI
console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl).then(() => {
  console.log('connected to MongoDB')
}).catch((error) => {
  console.log('error connection to MongoDB', error.message)
})

const Author = require('./models/authors')
const Book = require('./models/books')



const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String]
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      Book.find({}).then(data => console.log(data))
      return Book.collection.countDocuments()
    },
    authorCount: async () => {
      Author.find({}).then(data => console.log(data))
      return Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      // TODO: filter by genre and author
      let query = {}
      if (args.genre) {
        query = {
          ...query,
          genres: args.genre
        }
      }
      const books = await Book.find(query).populate('author')
      return books
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      return authors
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 })
        try {
          await author.save()
          console.log("saved author: ", author)
        } catch (error) {
          console.log(error)
        } 
      } else {
        author.bookCount += 1
        await author.save()
      }

      let book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      try {
        await book.save()
      } catch (error) {
        console.log(error)
      }

      return book


    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        console.log(error)
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
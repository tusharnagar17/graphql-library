const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type books {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
    book: [books!]!
  }

  type Query {
    bookCount: Int
    allBooks(author: String, genres: [String!]): [books!]!
    authorCount: Int
    allAuthor: [author!]!
 
  }
  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): books
   editAuthor(
    name: String!
    setBornTo: Int!
   ): author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      let filterData = books;
      if (args.author) {
        filterData = filterData.filter((data) => data.author === args.author);
      }
      if (args.genres && args.genres.length > 0) {
        filterData = filterData.filter((data) =>
          args.genres.every((genre) => data.genres.includes(genre))
        );
      }
      return filterData;
    },
    authorCount: () => authors.length,
    allAuthor: () => {
      return authors.map((author) => ({
        ...author,
        books: books.filter((book) => book.author === author.name),
        bookCount: books.filter((book) => book.author === author.name).length,
      }));
    },
  },
  Mutation: {
    // add book to schema
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid };
      books = books.concat(newBook);
      return newBook;
    },

    // edit born year in authors
    editAuthor: (root, args) => {
      let person = authors.find((data) => data.name === args.name);
      if (!person) {
        return null;
      }

      const newBornPerson = { ...person, born: args.setBornTo };
      authors = authors.map((data) =>
        data.name === args.name ? newBornPerson : data
      );
      return newBornPerson;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

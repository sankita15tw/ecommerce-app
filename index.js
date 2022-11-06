import { ApolloServer, gql } from "apollo-server"

const typeDefs = gql `
    type Query {
        hello: String
        age: Int
    }
`

const resolvers = {
    Query: {
        hello: () => "Hello GraphQL",
        age: () => 26
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log("Server running at this url: ", url)
})

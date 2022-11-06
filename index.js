import {ApolloServer, gql} from "apollo-server"
import { products, categories } from "./db.js"

const typeDefs = gql`
    type Product {
        id: ID!
        name: String
        description: String
        quantity: Int
        price: Float
        image: String
        onSale: Boolean
    }
    
    type Category {
        id: ID!
        name: String
    }

    type Query {
        hello: String
        age: Int
        product(id: String!) : Product
        products: [Product!]!
        categories: [Category!]!
    }
`

const resolvers = {
    Query: {
        hello: () => "Hello GraphQL",
        age: () => 26,
        products: () => {
            return products
        },
        categories: () => {
            return categories
        },
        product: (parent, { id }, context) => {
            return products.find(product => product.id === id)
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log("Server running at this url: ", url)
})

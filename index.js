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
        category: Category
    }
    
    type Category {
        id: ID!
        name: String
        products: [Product!]!
    }

    type Query {
        hello: String
        age: Int
        product(id: String!) : Product
        category(id: String!) : Category
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
        product: (parent, args, context) => {
            const productId = args.id
            return products.find(product => product.id === productId)
        },
        category: (parent, args, context) => {
            const categoryId = args.id
            return categories.find(category => category.id === categoryId)
        }
    },

    Category: {
        products: (parent, args, context) => {
            const categoryId = parent.id
            return products.filter(product => product.categoryId === categoryId)
        }
    },

    Product: {
        category: (parent, args, context) => {
            const productCategoryId = parent.categoryId
            return categories.find(category => category.id === productCategoryId)
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log("Server running at this url: ", url)
})

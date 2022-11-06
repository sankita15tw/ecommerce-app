import {gql} from "apollo-server";

export const typeDefs = gql`
    type Product {
        id: ID!
        name: String
        description: String
        quantity: Int
        price: Float
        image: String
        onSale: Boolean
        category: Category
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String
        products: [Product!]!
    }

    type Review {
        id: ID!
        date: String
        title: String
        comment: String
        rating: Int
    }

    input ProductsFilteredInput {
        onSale: Boolean
        avgRating: Int
    }

    type Query {
        hello: String
        age: Int
        product(id: String!) : Product
        category(id: String!) : Category
        products(filter: ProductsFilteredInput): [Product!]!
        categories: [Category!]!
    }
`

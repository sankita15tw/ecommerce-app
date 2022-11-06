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
    },
    
    input CategoryInput {
        name: String
    }
    
    input UpdateCategoryInput {
        name: String
    }
    
    input ProductInput {
        name: String!,
        description: String,
        quantity: Int!,
        price: Float!,
        image: String,
        onSale: Boolean,
        category: CategoryInput
    }

    input UpdateProductInput {
        name: String,
        description: String,
        quantity: Int,
        price: Float,
        image: String,
        onSale: Boolean,
        category: CategoryInput
    }
    
    input ReviewInput {
        date: String!,
        title: String!,
        comment: String!,
        rating: Int,
        productId: String!,
    }

    input UpdateReviewInput {
        date: String,
        title: String,
        comment: String,
        rating: Int,
        productId: String,
    }
    
    type Mutation {
        addCategory(input: CategoryInput!): Category!
        addProduct(input: ProductInput!): Product!
        addReview(input: ReviewInput!): Review!
        deleteCategory(id: String!): Boolean
        deleteProduct(id: String!): Boolean
        updateCategory(id: String!, input: UpdateCategoryInput!): Category!
        updateProduct(id: String!, input: UpdateProductInput!): Product!
        updateReview(id: String!, input: UpdateReviewInput!): Review!
    }
`

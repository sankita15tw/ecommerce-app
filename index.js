import {ApolloServer, gql} from "apollo-server"
import { products, categories, reviews } from "./db.js"

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

const resolvers = {
    Query: {
        hello: () => "Hello GraphQL",
        age: () => 26,
        products: (parent, args, context) => {
            let filteredProducts = products;
            let noOfRating = 0;
            let avgCalculatedRating;
            const { filter } = args
            if(filter && filter.onSale) {
                filteredProducts = products.filter(product => product.onSale)
            }
            if(filter && [1,2,3,4,5].includes(filter.avgRating)) {
                filteredProducts = filteredProducts.filter(filteredProduct => {
                    let sumRating = 0;
                    const filteredReviews = reviews.filter(review => {
                        return review.productId === filteredProduct.id
                    })
                    noOfRating = filteredReviews.length
                    filteredReviews.map(filteredReview => sumRating += filteredReview.rating)
                    avgCalculatedRating = sumRating/noOfRating
                    return avgCalculatedRating >= filter.avgRating
                })
            }
            return filteredProducts
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
        },

        reviews: (parent, args, context) => {
            const productId = parent.id
            return reviews.filter(review => review.productId === productId)
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log("Server running at this url: ", url)
})

import {categories, products, reviews} from "../db.js";

export const Query = {
    hello: () => "Hello GraphQL",
    age: () => 26,
    products: (parent, args, context) => {
        let filteredProducts = products;
        let noOfRating = 0;
        let avgCalculatedRating;
        const {filter} = args
        if (filter && filter.onSale) {
            filteredProducts = products.filter(product => product.onSale)
        }
        if (filter && [1, 2, 3, 4, 5].includes(filter.avgRating)) {
            filteredProducts = filteredProducts.filter(filteredProduct => {
                let sumRating = 0;
                const filteredReviews = reviews.filter(review => {
                    return review.productId === filteredProduct.id
                })
                noOfRating = filteredReviews.length
                filteredReviews.map(filteredReview => sumRating += filteredReview.rating)
                avgCalculatedRating = sumRating / noOfRating
                return avgCalculatedRating >= filter.avgRating
            })
        }
        return filteredProducts
    },
    category: (parent, args, context) => {
        const categoryId = args.id
        return categories.find(category => category.id === categoryId)
    },
    product: (parent, args, context) => {
        const productId = args.id
        return products.find(product => product.id === productId)
    },
    categories: () => categories
}

export const Query = {
    hello: () => "Hello GraphQL",
    age: () => 26,
    products: (parent, args, context) => {
        const { db } = context
        let filteredProducts = db.products;
        let noOfRating = 0;
        let avgCalculatedRating;
        const {filter} = args
        if (filter && filter.onSale) {
            filteredProducts = db.products.filter(product => product.onSale)
        }
        if (filter && [1, 2, 3, 4, 5].includes(filter.avgRating)) {
            filteredProducts = filteredProducts.filter(filteredProduct => {
                let sumRating = 0;
                const filteredReviews = db.reviews.filter(review => {
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
        const { db } = context
        const categoryId = args.id
        return db.categories.find(category => category.id === categoryId)
    },
    product: (parent, args, context) => {
        const { db } = context
        const productId = args.id
        return db.products.find(product => product.id === productId)
    },
    categories: (parent, args, context) => {
        const { db } = context
        return db.categories;
    }
}

export const Product = {
    category: (parent, args, context) => {
        const { db } = context
        const productCategoryId = parent.categoryId
        return db.categories.find(category => category.id === productCategoryId)
    },

    reviews: (parent, args, context) => {
        const { db } = context
        const productId = parent.id
        return db.reviews.filter(review => review.productId === productId)
    }
}

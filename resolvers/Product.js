export const Product = {
    category: (parent, args, context) => {
        const { categories } = context
        const productCategoryId = parent.categoryId
        return categories.find(category => category.id === productCategoryId)
    },

    reviews: (parent, args, context) => {
        const { reviews } = context
        const productId = parent.id
        return reviews.filter(review => review.productId === productId)
    }
}

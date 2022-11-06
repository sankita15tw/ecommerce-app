export const Category = {
    products: (parent, args, context) => {
        const { db } = context
        const categoryId = parent.id
        return db.products.filter(product => product.categoryId === categoryId)
    }
}

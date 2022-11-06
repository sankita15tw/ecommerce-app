export const Category = {
    products: (parent, args, context) => {
        const { products } = context
        const categoryId = parent.id
        return products.filter(product => product.categoryId === categoryId)
    }
}

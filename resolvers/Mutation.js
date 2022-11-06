import {v4 as uuid} from "uuid";

export const Mutation = {
    addCategory: (parent, {input}, context) => {
        const { db } = context
        const id = uuid()
        const newCategory = {
            id, name: input.name
        }
        db.categories.push(newCategory)
        return newCategory
    },
    addProduct: (parent, {input}, context) => {
        const { db } = context
        const id = uuid()
        const {name, description, quantity, price, image, onSale} = input
        const productCategory = input.category
        let categoryId = db.categories.find(category => category.name === productCategory.name).id;
        const newProducts = {
            id, name, description, quantity, price, image, onSale, categoryId
        }
        db.products.push(newProducts)
        return newProducts
    },

    addReview: (parent, {input}, context) => {
        const { db } = context
        const id = uuid()
        const {date, title, comment, rating, productId} = input
        const newReview = {
            id, date, title, comment, rating, productId
        }
        db.reviews.push(newReview)
        return newReview
    },
    deleteCategory: (parent, { id }, context) => {
        const { db } = context
        db.categories = db.categories.filter(category => category.id !== id)
        db.products = db.products.map(product => {
                if(product.categoryId === id) {
                    return {
                        ...product,
                        categoryId: null
                    }
                } else {
                    return product
                }
            })
        return true
    },
    deleteProduct: (parent, { id }, context) => {
        const { db } = context
        db.products = db.products.filter(product => product.id !== id)
        db.reviews = db.reviews.filter(review => review.productId !== id)
        return true
    },

    updateCategory: (parent, { id, input }, context) => {
        const { db } = context
        const index = db.categories.findIndex(category => category.id === id)
        db.categories[index] = {
            ...db.categories[index],
            name: input.name
        }
        return db.categories[index]
    },
    updateProduct: (parent, { id, input }, context) => {
        const { db } = context
        const index = db.products.findIndex(product => product.id === id)
        db.products[index] = {
            ...db.products[index],
            ...input
        }
        return db.products[index]
    },
    updateReview: (parent, { id, input }, context) => {
        const { db } = context
        const index = db.reviews.findIndex(review => review.id === id)
        db.reviews[index] = {
            ...db.reviews[index],
            ...input
        }
        return db.reviews[index]
    }
}

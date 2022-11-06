import {v4 as uuid} from "uuid";
import {categories, products, reviews} from "../db.js";

export const Mutation = {
    addCategory: (parent, {input}, context) => {
        const id = uuid()
        const newCategory = {
            id, name: input.name
        }
        categories.push(newCategory)
        return newCategory
    },
    addProduct: (parent, {input}, context) => {
        const id = uuid()
        const {name, description, quantity, price, image, onSale} = input
        const productCategory = input.category
        let categoryId = categories.find(category => category.name === productCategory.name).id;
        const newProducts = {
            id, name, description, quantity, price, image, onSale, categoryId
        }
        products.push(newProducts)
        return newProducts
    },

    addReview: (parent, {input}, context) => {
        const id = uuid()
        const {date, title, comment, rating, productId} = input
        const newReview = {
            id, date, title, comment, rating, productId
        }
        reviews.push(newReview)
        return newReview
    },
}

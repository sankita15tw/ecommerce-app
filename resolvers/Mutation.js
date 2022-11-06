import {v4 as uuid} from "uuid";
import {categories, products} from "../db.js";

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
    }
}

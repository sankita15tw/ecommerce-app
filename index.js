import {ApolloServer} from "apollo-server"
import {Query} from "./resolvers/Query.js";
import {Category} from "./resolvers/Category.js";
import {Product} from "./resolvers/Product.js";
import {Mutation} from "./resolvers/Mutation.js";
import {typeDefs} from "./schema.js";
import { db } from "./db.js";

const server = new ApolloServer({
    typeDefs, resolvers: {Query, Product, Category, Mutation}, context: { db }
})

server.listen().then(({url}) => {
    console.log("Server running at this url: ", url)
})

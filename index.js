import {ApolloServer} from "apollo-server"
import {Query} from "./resolvers/Query.js";
import {Category} from "./resolvers/Category.js";
import {Product} from "./resolvers/Product.js";
import {typeDefs} from "./schema.js";

const server = new ApolloServer({
    typeDefs, resolvers: {Query, Product, Category}
})

server.listen().then(({url}) => {
    console.log("Server running at this url: ", url)
})

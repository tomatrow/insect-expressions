import { GraphQLClient } from "graphql-request"
import { buildClientSchema } from "graphql/utilities/buildClientSchema.js"
import { printSchema } from "graphql/utilities/printSchema.js"
import { getIntrospectionQuery } from "graphql/utilities/getIntrospectionQuery.js"

const VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const VITE_SHOPIFY_SHOP_URL = process.env.VITE_SHOPIFY_SHOP_URL
const VITE_SHOPIFY_STOREFRONT_VERSION = process.env.VITE_SHOPIFY_STOREFRONT_VERSION

const headers = {
    "X-Shopify-Storefront-Access-Token": VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    "Content-Type": "application/json"
}

const path = `https://${VITE_SHOPIFY_SHOP_URL}/api/${VITE_SHOPIFY_STOREFRONT_VERSION}/graphql.json`

const graphQLClient = new GraphQLClient(path, {
    headers
})

const data = await graphQLClient.request(getIntrospectionQuery())

const build = buildClientSchema(data)

const schema = printSchema(build);

console.log(schema)

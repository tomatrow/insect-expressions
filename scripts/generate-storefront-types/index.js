import { GraphQLClient } from "graphql-request"
import { generateTypeScriptTypes } from "graphql-schema-typescript"
import { buildClientSchema } from "graphql/utilities/buildClientSchema.js"
import { getIntrospectionQuery } from "graphql/utilities/getIntrospectionQuery.js"

const endpoint = `https://${process.env.VITE_SHOPIFY_SHOP_URL}/api/${process.env.VITE_SHOPIFY_STOREFRONT_VERSION}/graphql.json`

const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
        "X-Shopify-Storefront-Access-Token": process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
})

graphQLClient.request(getIntrospectionQuery()).then(async data => {
    const build = buildClientSchema(data)
    try {
        await generateTypeScriptTypes(build, "./src/lib/types/shopify-storefront.d.ts", { typePrefix: "" })
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})

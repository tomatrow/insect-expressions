// https://github.com/prisma-labs/graphql-request/issues/136
// https://shopify.dev/api/admin/graphql/reference/metafields/metafieldstorefrontvisibilitycreate
// https://github.com/iamskok/gatsby-plugin-shopify-metafields/blob/master/src/lib.js

import { GraphQLClient } from "graphql-request"
import chalk from "chalk"
import inputs from "./inputs.js"

let success = true
const verbose = true
const warningMsg = `Key must be unique within this namespace on this resource`
const warningType = chalk.bold(`⚠️  WARNING`)
const errorType = chalk.bold(`🚨  ERROR`)
const updateMetafieldStorefrontVisibility = `
    mutation($input: MetafieldStorefrontVisibilityInput!) {
        metafieldStorefrontVisibilityCreate(input: $input) {
            metafieldStorefrontVisibility {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`

async function main() {
    const version = process.env.VITE_SHOPIFY_STOREFRONT_VERSION
    // https://{apikey}:{password}@{hostname}/admin/api/{version}/{resource}.json
    const endpoint = `https://${process.env.SHOPIFY_ADMIN_API_KEY}:${process.env.SHOPIFY_ADMIN_API_PASSWORD}@${process.env.VITE_SHOPIFY_SHOP_URL}/admin/api/${version}/graphql.json`
    console.log({ endpoint })
    const graphQLClient = new GraphQLClient(endpoint)
    const timeStart = Date.now()

    for (let input of inputs) {
        console.log({ input })
        const client = await graphQLClient.request(updateMetafieldStorefrontVisibility, { input })
        console.log({ errors: client?.metafieldStorefrontVisibilityCreate?.userErrors })
        if (client.metafieldStorefrontVisibilityCreate.userErrors[0]) {
            const msg = client.metafieldStorefrontVisibilityCreate.userErrors[0]
            const field = chalk.bold.blue(`{${msg.field[1]}: ${input[msg.field[1]]}}`)
            if (verbose) {
                if (msg.message === warningMsg) {
                    console.warn(`${warningType}\n${field}\n${JSON.stringify(msg)}\n`)
                } else {
                    success = false
                    console.error(`${errorType}\n${field}\n${JSON.stringify(msg)}\n`)
                }
            }
        }
    }

    const timeEnd = Date.now()
    const time = (timeEnd - timeStart) / 1000
    const timeMsg = `⏱  Done in ${time} seconds\n`

    if (success) {
        console.log(
            `\n${chalk.bold("✅  All storefront visibility metafields were added successfully")}\n`
        )
        console.log(`${timeMsg}`)
    } else {
        console.error(
            `\n${chalk.red(
                "🛑  There was an error during adding storefront visibility metafileds"
            )}\n`
        )
        console.log(`${timeMsg}`)
    }
}

main().catch(error => console.error(error))

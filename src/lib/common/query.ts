import { request } from "optional-default-site-kit/functions"

const VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
const VITE_SHOPIFY_SHOP_URL = import.meta.env.VITE_SHOPIFY_SHOP_URL as string
const VITE_SHOPIFY_STOREFRONT_VERSION = import.meta.env.VITE_SHOPIFY_STOREFRONT_VERSION as string

export function query(query: string, variables = {}) {
    return primitiveQuery(query, variables)
}

export function mutation(query: string, variables = {}) {
    return primitiveQuery(query, variables)
}

export async function primitiveQuery(query: string, variables: Record<string, any> = {}) {
    const { errors, data } = await request(`https://${VITE_SHOPIFY_SHOP_URL}/api/${VITE_SHOPIFY_STOREFRONT_VERSION}/graphql.json`, {
		body: { query, variables },
		headers: {
			"X-Shopify-Storefront-Access-Token": VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
			Accept: "application/json"
		}
	})

    if (errors) throw new Error(errors[0]?.message)

    return data
}

// just to get prettier to autocorrect syntax
export function graphql(strings: TemplateStringsArray, ...keys: string[]) {
    return strings.reduce((acc, next, index) => {
        return acc + next + (keys[index] ?? "")
    }, "")
}

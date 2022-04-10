import { GFetch } from "@leveluptuts/g-query"

const VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
const VITE_SHOPIFY_SHOP_URL = import.meta.env.VITE_SHOPIFY_SHOP_URL as string
const VITE_SHOPIFY_STOREFRONT_VERSION = import.meta.env.VITE_SHOPIFY_STOREFRONT_VERSION as string

const headers = {
    "X-Shopify-Storefront-Access-Token": VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    "Content-Type": "application/json"
}

const path = `https://${VITE_SHOPIFY_SHOP_URL}/api/${VITE_SHOPIFY_STOREFRONT_VERSION}/graphql.json`

export const g = new GFetch({
    path,
    headers
})
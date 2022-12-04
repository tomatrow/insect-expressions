import type { Collection, Page, Product, CollectionConnection } from "$lib/types/shopify-storefront.type"
import { graphql, query } from "./query"

export const productFragment = graphql`
    fragment ProductFragment on Product {
        availableForSale
        id
        title
        description
        descriptionHtml
        productType
        handle
        options {
            name
            values
        }
        images(first: 250) {
            edges {
                node {
                    originalSrc
                    altText
                }
            }
        }
        priceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        variants(first: 250) {
            edges {
                node {
                    id
                    sku
                    price
                    availableForSale
                    quantityAvailable
                    selectedOptions {
                        name
                        value
                    }
                }
            }
        }
    }
`

export const collectionFragment = graphql`
	fragment CollectionFragment on Collection {
		id
		title
		descriptionHtml
		image {
			id
			originalSrc
			altText
		}
	}
`

const productQuery = graphql`
    query ($handle: String!) {
        productByHandle(handle: $handle) {
            ...ProductFragment
        }
    }
    ${productFragment}
`

const pageQuery = graphql`
    query ($handle: String!) {
        pageByHandle(handle: $handle) {
            id
            title
            body
        }
    }
`

const collectionQuery = graphql`
    query ($handle: String!, $size: Int!, $cursor: String) {
        collectionByHandle(handle: $handle) {
			...CollectionFragment
            products(first: $size, sortKey: TITLE, after: $cursor) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        ...ProductFragment
                    }
                }
            }
        }
    }
	${collectionFragment}
    ${productFragment}
`

const collectionListQuery = graphql`
	{
		collections(first: 250, sortKey: TITLE) {
			edges {
				node {
					...CollectionFragment
				}
			}
		}
	}
	${collectionFragment}
`

export async function getProduct(handle: string) {
    const { productByHandle } = await query(productQuery, { handle })
    return productByHandle as Product
}

export async function getPage(handle: string) {
    const { pageByHandle } = await query(pageQuery, { handle })
    return pageByHandle as Page
}

export async function getCollection(handle: string, cursor?: string, size = 10) {
    const { collectionByHandle } = await query(collectionQuery, { handle, cursor, size })
    return collectionByHandle as Collection
}

export async function getCollectionList() {
	const { collections } = await query(collectionListQuery)
	return collections as CollectionConnection
}

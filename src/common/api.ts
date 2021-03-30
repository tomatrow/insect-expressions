/* queries used to load  */
import type { Collection } from "shopify-storefront-api-typings"
import { graphql, query } from "./query"

const blogQuery = graphql`
    query($handle: String!) {
        blogByHandle(handle: $handle) {
            title
            handle
            id
            articles(first: 250) {
                edges {
                    node {
                        id
                        title
                        handle
                        image {
                            altText
                            originalSrc
                        }
                    }
                }
            }
        }
    }
`

const blogListQuery = graphql`
    {
        blogs(first: 250) {
            edges {
                node {
                    id
                    title
                    handle
                    articles(first: 1) {
                        edges {
                            node {
                                id
                                excerptHtml
                                image {
                                    originalSrc
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`


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

const productQuery = graphql`
    query($handle: String!) {
        productByHandle(handle: $handle) {
            ...ProductFragment
        }
    }
    ${productFragment}
`


const collectionListQuery = graphql`
    {
        collections(first: 250) {
            edges {
                node {
                    id
                    handle
                    title
                    descriptionHtml
                    image {
                        id
                        altText
                        originalSrc
                    }
                }
            }
        }
    }
`


const pageQuery = graphql`
    query($handle: String!) {
        pageByHandle(handle: $handle) {
            id
            title
            body
        }
    }
`



const articleQuery = graphql`
    query($blogHandle: String!, $articleHandle: String!) {
        blogByHandle(handle: $blogHandle) {
            id
            articleByHandle(handle: $articleHandle) {
                id
                title
                contentHtml
                image {
                    id
                    altText
                    originalSrc
                }
                blog {
                    id
                    title
                    handle
                }
            }
        }
    }
`


const collectionQuery = graphql`
    query($handle: String!, $size: Int!, $cursor: String) {
        collectionByHandle(handle: $handle) {
            id
            title
            descriptionHtml
            image {
                id
                originalSrc
                altText
            }
            products(first: $size, after: $cursor) {
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
    ${productFragment}
`


const recommendationsQuery = graphql`
    query($id: ID!) {
        productRecommendations(productId: $id) {
            ...ProductFragment
        }
    }
    ${productFragment}
`


export async function blog(handle: string) {
    const { data } = await query(blogQuery, { handle })
    return data.blogByHandle
}

export async function blogList() {
    const { data } = await query(blogListQuery)
    return data.blogs
}
export async function collectionList() {
    const { data } = await query(collectionListQuery)
    return data.collections
}

export async function product(handle: string) {
    const { data } = await query(productQuery, { handle })
    return data.productByHandle
}

export async function page(handle: string) {
    const { data } = await query(pageQuery, { handle })
    return data.pageByHandle
}
export async function article(blogHandle: string, articleHandle: string) {
    const { data } = await query(articleQuery, { blogHandle, articleHandle })
    return data.blogByHandle?.articleByHandle
}
export async function collection(handle: string, cursor?: string, size = 10) {
    const { data } = await query(collectionQuery, { handle, cursor, size })
    return data.collectionByHandle as Collection
}


export async function recommendations(id: string) {
    const { data } = await query(recommendationsQuery, { id })
    return data.productRecommendations
}

import type {
	CartCreatePayload,
	Collection,
	Page,
	Cart,
	Product,
	CollectionConnection,
	CartNoteUpdatePayload,
	CartLineInput,
	CartLinesAddPayload,
	CartLine,
	PageInfo,
	ProductConnection
} from "$lib/types/shopify-storefront.type"
import { mapValues } from "lodash"
import { graphql, query, mutation } from "./query"
import { type CustomizerConfig, rawCustomizerConfig } from "./customizer"

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
					url
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
					title
					availableForSale
					quantityAvailable
					selectedOptions {
						name
						value
					}
				}
			}
		}
		metafields(identifiers: [{ namespace: "insect_customizer", key: "process" }]) {
			namespace
			key
			value
		}
	}
`

export const collectionFragment = graphql`
	fragment CollectionFragment on Collection {
		id
		title
		handle
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

const productsQuery = graphql`
	query getProducts {
		products(first: 250) {
			edges {
				node {
					...ProductFragment
				}
			}
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

type MinimalCartLine = Pick<CartLine, "id" | "quantity" | "attributes"> & {
	merchandise: {
		id: string
		product: {
			id: string
		}
	}
}

export type CartFragment = Omit<Cart, "deliveryGroups" | "discountCodes" | "lines"> & {
	lines: {
		edges: {
			cursor: string
			node: MinimalCartLine
		}[]
		nodes: MinimalCartLine[]
		pageInfo: PageInfo
	}
}

const cartFragment = graphql`
	fragment CartFragment on Cart {
		attributes {
			key
			value
		}
		buyerIdentity {
			countryCode
			email
			phone
		}
		checkoutUrl
		createdAt
		estimatedCost {
			totalAmount {
				amount
				currencyCode
			}
		}
		id
		lines(first: 250) {
			edges {
				node {
					id
					quantity
					attributes {
						key
						value
					}
					merchandise {
						... on ProductVariant {
							id
							product {
								id
							}
						}
					}
				}
			}
		}
		note
		updatedAt
	}
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

const cartNoteUpdateMutation = `
	mutation cartNoteUpdate($cartId: ID!, $note: String) {
		cartNoteUpdate(cartId: $cartId, note: $note) {
			cart {
				...CartFragment
			}
			userErrors {
				field
				message
			}
		}
	}
	${cartFragment}
`

const createCartMutation = `
	mutation cartCreate {
		cartCreate {
			cart {
				...CartFragment
			}
			userErrors {
				field
				message
			}
		}
	}
	${cartFragment}
`

const addCartLinesMutation = `
	mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			cart {
				...CartFragment
			}
			userErrors {
				field
				message
			}
		}
	}
	${cartFragment}
`

export async function addCartLines(cartId: string, lines: CartLineInput[]) {
	const { cartLinesAdd } = await mutation(addCartLinesMutation, { cartId, lines })
	return cartLinesAdd as Omit<CartLinesAddPayload, "cart"> & {
		cart?: CartFragment
	}
}

export async function createCart() {
	const { cartCreate } = await mutation(createCartMutation)
	return cartCreate as Omit<CartCreatePayload, "cart"> & {
		cart?: CartFragment
	}
}

export async function updateCartNote(cartId: string, note?: string) {
	const { cartNoteUpdate } = await mutation(cartNoteUpdateMutation, { cartId, note })
	return cartNoteUpdate as CartNoteUpdatePayload
}

export function hydrateProductMetafields(product: Product) {
	const insectCustomizerProcess = product.metafields?.find(
		metafield => metafield?.namespace === "insect_customizer" && metafield.key === "process"
	)

	let customizerConfig: CustomizerConfig | undefined = undefined

	if (insectCustomizerProcess)
		try {
			const json = JSON.parse(insectCustomizerProcess.value)

			const result = rawCustomizerConfig.safeParse(json)
			if (!result.success)
				throw new Error(
					JSON.stringify(
						{
							productHandle: product.handle,
							json,
							error: result.error.format()
						},
						null,
						2
					)
				)

			const { order = [], steps = {} } = result.data

			customizerConfig = {
				order,
				steps: mapValues(steps, (step, handle) => ({
					...step,
					handle
				}))
			}
		} catch (error) {
			console.error(error)
		}

	return { ...product, customizerConfig }
}

export async function getProduct(handle: string) {
	const { productByHandle } = await query(productQuery, { handle })
	const product = productByHandle as Product | null
	if (!product) throw new Error(`not found - /products/${handle}`)
	return hydrateProductMetafields(product)
}

export async function getProducts() {
	const response: Record<string, any> = await query(productsQuery)
	const products = response.products as Pick<ProductConnection, "edges">
	return products.edges.map(edge => edge.node).map(hydrateProductMetafields)
}

export type HydratedProduct = Awaited<ReturnType<typeof getProduct>>

export async function getPage(handle: string) {
	const { pageByHandle } = await query(pageQuery, { handle })
	return pageByHandle as Page
}

export async function getCollection(handle: string, cursor?: string, size = 10) {
	const response = await query(collectionQuery, { handle, cursor, size })

	const { collectionByHandle } = response

	const collection = collectionByHandle as Collection | null

	if (!collection) throw new Error(`not found - /collections/${handle}`)

	return {
		...collection,
		products: {
			...collection.products,
			edges: collection.products.edges.map(edge => ({
				...edge,
				node: hydrateProductMetafields(edge.node)
			}))
		}
	}
}

export async function getCollectionList() {
	const response = await query(collectionListQuery)
	const collections = response.collections as CollectionConnection | null

	if (!collections) throw new Error(`not found - /collections`)

	return collections.edges.map(edge => edge.node) ?? []
}

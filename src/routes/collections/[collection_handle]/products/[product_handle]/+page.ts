import type { PageLoad } from "./$types"
import { getCollection } from "$lib/common/api"
import { error } from "@sveltejs/kit"

export const load: PageLoad = async ({ params }) => {
	const collection = await getCollection(params?.collection_handle)
	const product = collection.products.edges.map(edge => edge.node).find(node => node.handle === params.product_handle)

	if (!product) throw error(404)

	return { product, collection }
}

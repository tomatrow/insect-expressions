import type { PageLoad } from "./$types"
import { getProduct } from "$lib/common/api"
import { error } from "@sveltejs/kit"

export const load: PageLoad = async ({ params }) => {
	const product = await getProduct(params?.handle)

	if (!product) throw error(404)

	return { product }
}

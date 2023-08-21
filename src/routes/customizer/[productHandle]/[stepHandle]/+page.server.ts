import type { PageServerLoad, Actions } from "./$types"
import { error, fail } from "@sveltejs/kit"
import { getProducts, type HydratedProduct } from "$lib/common/api"
import { Customizer, CustomizerStepType } from "$lib/common/customizer"

async function getProductsByHandle() {
	const products = await getProducts()
	const productsByHandle = Object.fromEntries(products.map(product => [product.handle, product]))
	return productsByHandle
}

export const load = (async ({ params, cookies }) => {
	const { productHandle, stepHandle } = params

	try {
		const { selections, product, products } = new Customizer(
			productHandle,
			await getProductsByHandle(),
			cookies.get("customizer")
		)

		return {
			selections,
			product,
			products,
			stepHandle
		}
	} catch (err: any) {
		throw error(400, err?.message)
	}
}) satisfies PageServerLoad

export const actions = {
	async selectOption({ cookies, params: { productHandle, stepHandle }, request }) {
		let products: Partial<Record<string, HydratedProduct>>
		try {
			products = await getProductsByHandle()
		} catch (error: any) {
			return fail(400, {
				internal: true
			})
		}

		let customizer: Customizer
		try {
			customizer = new Customizer(productHandle, products, cookies.get("customizer"))
		} catch (error: any) {
			return fail(404, {
				notFound: true
			})
		}

		const data = await request.formData()

		switch (data.get("type")) {
			case CustomizerStepType.OPTION: {
				const value = data.get("value")
				if (typeof value !== "string")
					return fail(400, {
						invalidType: {
							value: true
						}
					})
				try {
					customizer.selectOption(stepHandle, { value })
				} catch {
					return fail(400, {
						badSelection: true
					})
				}

				break
			}
			case CustomizerStepType.ACCESSORY: {
				const handle = data.get("handle")
				if (typeof handle !== "string")
					return fail(400, {
						invalidType: {
							handle: true
						}
					})

				customizer.selectAccessories(handle, [])
				break
			}
			default:
				return fail(400, {
					missing: {
						type: true
					}
				})
		}

		cookies.set("customizer", customizer.toString())
	},
	async restart({ cookies }) {
		cookies.delete("customizer")
	}
} satisfies Actions

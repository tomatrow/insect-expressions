import type { PageServerLoad, Actions } from "./$types"
import { error, fail } from "@sveltejs/kit"
import { z, ZodError } from "zod"
import { parseFormData } from "$lib/common/utility"
import { getProducts, type HydratedProduct } from "$lib/common/api"
import {
	Customizer,
	CustomizerStepType,
	customizerOptionSelectionData,
	customizerAccessorySelectionData
} from "$lib/common/customizer"

const schema = z.discriminatedUnion("type", [
	z.object({ type: z.literal(CustomizerStepType.OPTION) }).merge(customizerOptionSelectionData),
	z.object({ type: z.literal(CustomizerStepType.ACCESSORY) }).merge(customizerAccessorySelectionData)
])

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
			products,
			product,
			customizer: {
				selections,
				stepHandle,
				config: product.customizerConfig
			}
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

		let parsedData: Record<string, any>
		try {
			parsedData = parseFormData(await request.formData())
		} catch (error: any) {
			return fail(400, {
				formDataParseFailure: true
			})
		}

		let actionData: z.infer<typeof schema>
		try {
			actionData = schema.parse(parsedData)
		} catch (error: any) {
			return fail(400, {
				formDataValidationFailure: true,
				issues: error instanceof ZodError ? error.issues : undefined
			})
		}

		try {
			switch (actionData.type) {
				case CustomizerStepType.OPTION:
					const { value } = actionData
					customizer.selectOption(stepHandle, { value })
					break
				case CustomizerStepType.ACCESSORY:
					const { selections } = actionData
					customizer.selectAccessories(stepHandle, selections)
					break
			}
		} catch {
			return fail(400, {
				selectionFailure: true
			})
		}

		cookies.set("customizer", customizer.toString())
	},
	async restart({ cookies }) {
		cookies.delete("customizer")
	}
} satisfies Actions

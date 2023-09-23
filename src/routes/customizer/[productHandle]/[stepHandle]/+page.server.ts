import type { PageServerLoad, Actions } from "./$types"
import { error, fail } from "@sveltejs/kit"
import { z, ZodError } from "zod"
import { parseFormData } from "$lib/common/utility"
import { getProducts, type HydratedProduct } from "$lib/common/api"
import {
	Customizer,
	CustomizerStepType,
	customizerOptionSelectionData,
	productSelectionData,
	type CustomizerOptionSelectionData,
	type CustomizerAccessorySelectionData
} from "$lib/common/customizer"

const schema = z.discriminatedUnion("type", [
	z.object({ type: z.literal(CustomizerStepType.OPTION) }).merge(customizerOptionSelectionData),
	z.object({
		type: z.literal(CustomizerStepType.ACCESSORY),
		selections: z.array(
			productSelectionData.extend({
				count: z.string()
			})
		)
	})
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
	} catch (loadError: any) {
		throw error(400, loadError?.message)
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

		let customizerSelectionData:
			| ({
					type: CustomizerStepType.OPTION
			  } & CustomizerOptionSelectionData)
			| ({
					type: CustomizerStepType.ACCESSORY
			  } & CustomizerAccessorySelectionData)
		switch (actionData.type) {
			case "OPTION":
				customizerSelectionData = actionData
				break
			case "ACCESSORY":
				customizerSelectionData = {
					...actionData,
					selections: actionData.selections.map(({ count, ...rest }) => ({ count: +count, ...rest }))
				}
				break
			default:
				return fail(400, {
					formDataHydrationFailure: true
				})
		}

		try {
			switch (customizerSelectionData.type) {
				case CustomizerStepType.OPTION:
					const { value } = customizerSelectionData
					customizer.selectOption(stepHandle, { value })
					break
				case CustomizerStepType.ACCESSORY:
					const { selections } = customizerSelectionData
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
	async reset({ cookies }) {
		console.log("reset")
		cookies.delete("customizer")
	}
} satisfies Actions

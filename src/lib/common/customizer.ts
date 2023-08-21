import { isNotNil } from "./utility"
import type { HydratedProduct } from "./api"
import type { Nullable, PickEnsure } from "$lib/types/utility.type"
import { z } from "zod"

// const customizerStepType = z.enum(["OPTION", "ACCESSORY"])

export enum CustomizerStepType {
	OPTION = "OPTION",
	ACCESSORY = "ACCESSORY"
}

const productOptionConstraints = z.object({
	name: z.string(),
	include: z.array(z.string()).optional(),
	exclude: z.array(z.string()).optional()
})

export interface ProductOptionConstraints {
	// name of the option attached to the product
	name: string
	// include option values
	include?: string[]
	// excluded option values
	exclude?: string[]
}

const customizerOptionStepData = z.object({
	type: z.literal(CustomizerStepType.OPTION),
	name: z.string(),
	optionConstraint: productOptionConstraints.optional()
})

export interface CustomizerOptionStepData {
	type: CustomizerStepType.OPTION
	// name of the step
	name: string
	// name of option with possible constraints
	optionConstraint?: ProductOptionConstraints
}

export interface CustomizerOptionStep extends CustomizerOptionStepData {
	handle: string
}

const customizerAccessoryStepData = z.object({
	type: z.literal(CustomizerStepType.ACCESSORY),
	name: z.string(),
	collection: z.string(),
	max: z.number().optional(),
	min: z.number().optional(),
	optionConstraints: z
		.array(
			productOptionConstraints.and(
				z.object({
					handle: z.string()
				})
			)
		)
		.optional()
})

export interface CustomizerAccessoryStepData {
	type: CustomizerStepType.ACCESSORY
	name: string
	collection: string
	max?: number
	min?: number
	optionConstraints?: Array<
		ProductOptionConstraints & {
			// handle of accessory product in collection
			handle: string
		}
	>
}

export interface CustomizerAccessoryStep extends CustomizerAccessoryStepData {
	handle: string
}

const customizerStepData = z.discriminatedUnion("type", [customizerOptionStepData, customizerAccessoryStepData])

export type CustomizerStepData = CustomizerOptionStepData | CustomizerAccessoryStepData

export type CustomizerStep = CustomizerOptionStep | CustomizerAccessoryStep

export interface CustomizerConfig {
	// order of steps by handle
	order: string[]
	// steps available in the customizer
	steps: Record<string, CustomizerStep>
}

export const rawCustomizerConfig = z.object({
	order: z.array(z.string()).optional(),
	steps: z.record(customizerStepData).optional()
})

export interface RawCustomizerConfig {
	order?: string[]
	steps?: Record<string, CustomizerStepData>
}

export interface CustomizerOptionSelectionData {
	value: string
}

export interface ProductSelectionData {
	handle: string
	options: Record<string, string>
}

export function isProductSelectionData<T>(value: T): value is T & ProductSelectionData {
	return (
		typeof (value as Nullable<ProductSelectionData>)?.handle === "string" &&
		typeof (value as Nullable<ProductSelectionData>)?.options === "object"
	)
}

export interface CustomizerAccessorySelectionData {
	selections: ProductSelectionData[]
}

export function isCustomizerAccessorySelectionData<T>(value: T): value is T & CustomizerAccessorySelectionData {
	return Array.isArray((value as Nullable<CustomizerAccessorySelectionData>)?.selections)
}

export type CustomizerSelectionData = CustomizerOptionSelectionData | CustomizerAccessorySelectionData

type CustomizerSelections = Record<string, CustomizerSelectionData>

export interface CustomizerState {
	config: CustomizerConfig
	selections: CustomizerSelections
}

const cleanSelections = (config: CustomizerConfig, selections: CustomizerSelections): CustomizerSelections =>
	Object.fromEntries(
		Object.entries(selections)
			.filter(([handle, selection]) => {
				const step = config.steps[handle]

				if (!step) return false

				switch (step.type) {
					case "ACCESSORY":
						return "selections" in (selection as CustomizerAccessorySelectionData)
					case "OPTION":
						return "options" in (selection as CustomizerOptionSelectionData)
				}
			})
			.filter(isNotNil)
	)

export class Customizer {
	products: Partial<Record<string, HydratedProduct>>
	productHandle: string
	selections: CustomizerSelections

	constructor(
		productHandle: string,
		products: Partial<Record<string, HydratedProduct>>,
		serializedSelections?: string
	) {
		let selections: CustomizerSelections = {}

		if (serializedSelections) {
			const deserializedSelections: CustomizerSelections | null = JSON.parse(serializedSelections)
			if (deserializedSelections) selections = deserializedSelections
		}

		const config = products[productHandle]?.customizerConfig

		if (!config) throw new Error("Product config does not exist")

		this.productHandle = productHandle
		this.products = products
		this.selections = cleanSelections(config, selections)
	}

	get product() {
		return this.products[this.productHandle]! as PickEnsure<HydratedProduct, "customizerConfig">
	}

	get config() {
		return this.product.customizerConfig
	}

	getStep(handle: string) {
		return this.config.steps[handle]
	}

	selectOption(handle: string, { value }: CustomizerOptionSelectionData) {
		const step = this.getStep(handle)

		if (!step) throw new Error("Unknown step")

		if (step.type !== CustomizerStepType.OPTION) throw new Error("Option step type is required")

		const { exclude = [], include } = step.optionConstraint ?? {}

		if ((include && !include.includes(value)) || exclude.includes(value)) return

		this.selections = {
			...this.selections,
			[handle]: { value }
		}
	}

	selectAccessories(handle: string, selections: ProductSelectionData[]) {
		const step = this.getStep(handle)

		if (!step) throw new Error("Unknown step")

		if (step.type !== CustomizerStepType.ACCESSORY) throw new Error("Accessory step type is required")

		if (!selections.length) throw new Error("At leasrt one accessory selction is required")

		let currentSelection = this.selections[handle]
		if (!isCustomizerAccessorySelectionData(currentSelection))
			currentSelection = {
				selections: []
			}

		this.selections = {
			...this.selections,
			[handle]: {
				selections: [...currentSelection.selections, ...selections]
			}
		}
	}

	toString() {
		return JSON.stringify(this.selections)
	}
}

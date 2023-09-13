import type { Collection } from "$lib/types/shopify-storefront.type"
import type { HydratedProduct } from "$lib/common/api"
import type { CustomizerConfig, CustomizerSelections } from "$lib/common/customizer"

declare global {
	namespace App {
		interface PageData {
			collections: Collection[]
			products?: Partial<Record<string, HydratedProduct>>
			customizer?: {
				stepHandle: string
				config: CustomizerConfig
				selections: CustomizerSelections
			}
		}
	}
}

export {}

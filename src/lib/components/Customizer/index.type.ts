export interface SelectionStepPrompt {
	kind: "SELECTION"
	collection: string
	title?: string
	handle?: string
	subtitle?: string
	min?: number
	max?: number
}

export interface InformationStepPrompt {
	kind: "INFORMATION"
	title: string
	handle?: string
	promptHtml: string
	promptPlaceholder?: string
}

export type CustomizerStepPrompt = SelectionStepPrompt | InformationStepPrompt

export interface CustomizerProcessData {
	stepPrompts: CustomizerStepPrompt[]
}

// export interface CustomizerSelectionOptionData {
// 	name: string
// 	options: string[]
// }

// export type CustomizerOptionData = CustomizerSelectionOptionData[]

import { set } from "lodash"
import type { Nullable } from "$lib/types/utility.type"

export function formatMoney(amount: number) {
	return new Intl.NumberFormat("en-us", {
		style: "currency",
		currency: "USD"
	}).format(amount)
}

export function preloadImage(url: string) {
	const image = new Image()
	return new Promise(resolve => {
		image.onload = resolve
		image.src = url
	})
}

export function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export function isNotNil<T>(value: Nullable<T>): value is NonNullable<T> {
	return value !== null && value !== undefined
}

export function parseFormData(formData: FormData) {
	const data: Record<string, any> = {}
	for (const [path, value] of formData) set(data, path, value)
	return data
}

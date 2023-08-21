import { createCart, updateCartNote, addCartLines, type CartFragment } from "./api"
import { isEqual } from "lodash"

export class Cart {
	cart?: CartFragment

	constructor(serialized?: string) {
		if (serialized) {
			const cart: CartFragment | null = JSON.parse(serialized)
			if (cart) this.cart = cart
		}
	}

	getLine(id: string, properties: Record<string, string> = {}) {
		if (!this.cart) throw new Error("Missing cart")

		return this.cart.lines.edges
			.map(edge => edge.node)
			.find(line =>
				isEqual(
					{ id, properties },
					{
						id: line.merchandise.id,
						properties: Object.fromEntries(line.attributes.map(({ key, value }) => [key, value]))
					}
				)
			)
	}

	async add(id: string, properties: Record<string, string> = {}, quantity = 1) {
		if (!this.cart) throw new Error("Missing cart")

		const { cart, userErrors } = await addCartLines(this.cart.id, [
			{
				merchandiseId: id,
				attributes: Object.entries(properties).map(([key, value]) => ({ key, value })),
				quantity
			}
		])

		if (cart) this.cart = cart
		else throw userErrors

		return cart
	}

	/**
	 * @throws CartUserError[]
	 */
	async create() {
		const { cart, userErrors } = await createCart()

		if (cart) this.cart = cart
		else throw userErrors

		return cart
	}

	async updateNote(note?: string) {
		if (!this.cart) throw new Error("Missing cart")

		const { cart, userErrors } = await updateCartNote(this.cart.id, note)

		if (cart) this.cart = cart
		else throw userErrors

		return cart
	}

	toString() {
		return JSON.stringify(this.cart ?? null)
	}
}

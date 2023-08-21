import { Cart } from "$lib/common/cart"
import type { PageServerLoad, Actions } from "./$types"
import { fail } from "@sveltejs/kit"

export const load = (({ cookies, parent }) => {
	const { cart } = new Cart(cookies.get("cart"))

	parent().then(data => {
		console.log({ data })
	})

	return {
		cart
	}
}) satisfies PageServerLoad

export const actions = {
	async add({ request, cookies }) {
		const cart = new Cart(cookies.get("cart"))

		const data = await request.formData()
		const id = (data.get("id") ?? undefined) as string | undefined

		if (!id) throw fail(400)

		const properties = Object.fromEntries(
			[...data.entries()]
				.map(([name, value]) => {
					const [, key] = [...name.matchAll(/attributes\[(?<value>.+)\]/g)]?.[0] ?? []
					if (!key) return
					return [key, value]
				})
				.filter(Boolean) as [string, string][]
		)

		await cart.add(id, properties)

		cookies.set("cart", cart.toString(), { path: "/" })
	},
	async updateNote({ request, cookies }) {
		const cart = new Cart(cookies.get("cart"))

		const data = await request.formData()
		const note = (data.get("note") ?? undefined) as string | undefined

		await cart.updateNote(note)

		cookies.set("cart", cart.toString(), { path: "/" })
	},
	async clear({ cookies }) {
		cookies.delete("cart")
	}
} satisfies Actions

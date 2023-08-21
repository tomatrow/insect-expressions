import type { Handle } from "@sveltejs/kit"
import { Cart } from "$lib/common/cart"

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.cookies.get("cart")) {
		const cart = new Cart()
		await cart.create()
		event.cookies.set("cart", cart.toString(), { path: "/" })
	}

	return await resolve(event, {
		filterSerializedResponseHeaders: name => name.toLowerCase() === "content-type"
	})
}

import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
	return await resolve(event, {
		filterSerializedResponseHeaders: name => name.toLowerCase() === "content-type"
	})
}

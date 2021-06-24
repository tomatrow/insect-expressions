import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ request, resolve }) => {
    console.log(request.path)

    return await resolve(request)
}

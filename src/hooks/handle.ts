import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { getSessionResources } from "./getSession"
import type { Locals } from "./index.type"

const handleLogging: Handle<Locals> = async ({ request, resolve }) => {
    console.log(request.path)
    return await resolve(request)
}

const handleSessionResources: Handle<Locals> = async ({ request, resolve }) => {
    request.locals.sessionResources = await getSessionResources()
    return await resolve(request)
}

export const handle = sequence(handleLogging, handleSessionResources)

import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { getSessionResources } from "./getSession"
import type { Locals } from "./index.type"

const handleLogging: Handle<Locals> = async ({ event, resolve }) => {
    return await resolve(event)
}

const handleSessionResources: Handle<Locals> = async ({ event, resolve }) => {
    // request.locals.sessionResources = await getSessionResources()
    return await resolve(event)
}

export const handle = sequence(
    handleLogging, 
    handleSessionResources
)

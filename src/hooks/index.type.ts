import type { getSessionResources } from "./getSession"
import type { Awaited } from "$lib/types/utility.type"

export interface Locals extends Record<string,any> {
    sessionResources: Awaited<ReturnType<typeof getSessionResources>>
}

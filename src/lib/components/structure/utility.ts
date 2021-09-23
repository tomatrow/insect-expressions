import { setContext, getContext } from "svelte-typed-context"
import type { InjectionKey } from "svelte-typed-context"

export interface HeadingContext {
    level: number
}

export const key: InjectionKey<HeadingContext> = Symbol("heading-level")

export function getHeadingContext() {
    return getContext(key) ?? { level: 1 }
}

export function incrementHeadingLevel() {
    let context = getContext(key)
    context ??= { level: 0 }
    context.level += 1
    setContext(key, context)
    const { level } = context
    return level
}

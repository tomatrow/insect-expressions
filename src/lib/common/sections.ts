export interface LinkList {
    id: string
    title: string
    url: string
    children: LinkList[]
}

export type Settings = Record<string, any>

export interface HasSettings {
    id: string
    settings: Settings
    linklists: Record<string, LinkList[]>
}

export interface Block extends HasSettings {
    type: string
}

export interface Section extends HasSettings {
    blocks: Block[]
}

export const sectionCache: Record<string, string> = {}

function parseSection(doc: DocumentFragment, id: string, selector: string) {
    const script = doc.querySelector(
        selector ?? `#shopify-section-${id} script[type="application/json"]`
    )
    const result = script ? JSON.parse(script.innerHTML) : null
    if (result) sectionCache[id] = result
    return result as Section
}

async function requestSection(url: URL, id: string, selector: string) {
    const response = await fetch(url.href)

    const text = await response.text()
    const range = document.createRange()
    const fragment = range.createContextualFragment(text)

    return parseSection(fragment, id, selector)
}

interface BypassOptions {
    doc?: boolean
    api?: boolean
    cache?: boolean
}

export interface SectionOptions {
    id?: string
    bypass?: BypassOptions
    path?: string
    params?: URLSearchParams
    selector?: string
}

/**
 * Loads json settings for a shopify section
 * - [section schema tags](https://shopify.dev/docs/themes/sections#using-section-schema-tags)
 * - [rendering api](https://shopify.dev/docs/themes/sections/section-rendering-api)
 * @param options
 * @param options.id - The id of static/dynamic the section desired.
 * @param  options.bypass - Whither to skip trying the section rendering api, parsing the current document, or the cache.
 * @param options.path - The section will be rendered in context of this path.
 * @param options.params - URL params for the request.
 * @param options.selector - Selector for the script
 * @returns JSON of the section desired, else the first json type script in the section is selected.
 */
export async function loadSection({
    id,
    bypass = {},
    path = window.location.pathname,
    params = new URLSearchParams(window.location.search),
    selector = null
}: SectionOptions = {}): Promise<Section> {
    // see if we cached it
    if (!bypass.cache) {
        const section = sectionCache[id]
        if (section) section
    }

    // try to find it in the current document
    if (!bypass.doc) {
        const section = parseSection(document, id, selector)
        if (section) return section
    }

    const url = new URL(path, window.location.origin)

    // try to use the section rendering api
    if (!bypass.api) {
        try {
            params.append("section_id", id)
            url.search = params.toString()
            return await requestSection(url, id, selector)
        } catch (error) {
            console.warn(`Request to render section ${id} failed. Requesting full page.`)
        }
    }

    // request the full page
    url.search = ""
    return await requestSection(url, id, selector)
}

export function filterBlocks(type: string, section: Section): Settings[] {
    return (
        section?.blocks
            .filter(block => block.type === type)
            .map(block => ({
                ...block.settings,
                __linklists: block.linklists
            })) ?? []
    )
}

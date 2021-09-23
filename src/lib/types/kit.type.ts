import type { Link, Image, Platform } from "$lib/types/utility.type"
import type { Shop } from "$lib/types/shopify-storefront.type"


export type MenuItem = Link & { children: MenuItem[] }

export interface Menu {
    items: MenuItem[]
}

export interface Session extends Record<string, any> {
    header: {
        essentialMenu: Menu
        primaryMenu: Menu
    }
    footer: {
        linkSections: {
            title: string
            links: Link[]
        }[]
    }
    brand: {
        logo: Image
        social: {
            platform: Platform
            link: Link
        }[]
    }
    shop: Pick<Shop, "primaryDomain" | "name">
}

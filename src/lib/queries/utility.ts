import type { MetafieldConnection } from "$lib/types/shopify-storefront.type"

export const KitMetafieldsFragment = `
    fragment KitMetafieldsFragment on HasMetafields {
        kitMetafields: metafields(first: 250, namespace: "kit") {
            edges {
                node {
                    id
                    key
                    type
                    value
                }
            }
        }
    }
`

export interface HasKitMetafields {
    kitMetafields: MetafieldConnection
}

// get all kit fields as parsed json
export function getKitFields<T extends HasKitMetafields>(source: T) {
    return Object.fromEntries(
        source.kitMetafields.edges
            .map(edge => edge.node)
            .map(({ key, value, type }) => {
                let result: any

                switch (type) {
                    case "json":
                        result = JSON.parse(value)
                        break
                    case "multi_line_text_field":
                        if (!key.endsWith("html")) throw new Error("Need to end with html")
                        result = value
                        break
                    default:
                        throw new Error("Unexpected metafield value type")
                }
                return [key, result]
            })
    )
}

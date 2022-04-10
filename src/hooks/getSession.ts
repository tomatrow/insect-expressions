import type { GetSession } from "@sveltejs/kit"
import { KitMetafieldsFragment, getKitFields } from "$lib/queries/utility"
import type { HasKitMetafields } from "$lib/queries/utility"
import { graphql, query } from "$lib/common/query"
import type { Shop } from "$lib/types/shopify-storefront.type"
import type { Locals } from "./index.type"
import type { Session } from "$lib/types/kit.type"

export const getSession: GetSession<Locals, Session> = ({ locals }) => {
    return {}
//     const { primaryDomain, name } = locals.sessionResources.shop
//     const { header, footer, brand } = getKitFields(locals.sessionResources.shop)
// 
//     const session: Session = {
//         header,
//         footer,
//         brand,
//         shop: {
//             primaryDomain,
//             name
//         }
//     }
// 
//     return session
}

export async function getSessionResources() {
    const { data } = await query(graphql`
        query SessionQuery {
            shop {
                ...KitMetafieldsFragment
                name
                primaryDomain {
                    host
                    url
                }
            }
        }

        ${KitMetafieldsFragment}
    `)

    return data as { shop: Shop & HasKitMetafields }
}

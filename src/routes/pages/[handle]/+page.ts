// import type { Page } from "$lib/types/shopify-storefront.type"
import { graphql, query } from "$lib/common/query"

export async function load({ params }) {
    const { data } = await query(
        graphql`
                query ($handle: String!) {
                    page: pageByHandle(handle: $handle) {
                        id
                        title
                        body
                    }
                }
            `,
        { handle: params.handle }
    )

    return data
}

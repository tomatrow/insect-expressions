import type { Page } from "$lib/types/shopify-storefront.type"
import { graphql, query } from "$lib/common/query"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ params }) => {
    return await query(
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
    ) as { page: Page }
}

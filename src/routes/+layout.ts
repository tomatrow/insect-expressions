import { installFetch } from "optional-default-site-kit/functions"
import { getCollectionList } from "$lib/common/api"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ fetch }) => {
	installFetch(fetch)
    return {
		collections: await getCollectionList()
	}
}

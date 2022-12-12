import type { PageLoad } from "./$types"
import { getCollection } from "$lib/common/api"

export const load: PageLoad = ({ params }) => {
	return { collection: getCollection(params?.collection_handle)  }
}

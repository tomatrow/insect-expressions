import { collection } from "$lib/common/api"

/** @type {import("./$types").PageData */
export function load({ params }) {
	return collection(params?.handle)
}

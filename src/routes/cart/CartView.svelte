<script lang="ts">
	import type { CollectionConnection } from "$lib/types/shopify-storefront.type"
	import type { CartFragment } from "$lib/common/api"
	import Link from "$lib/components/Link.svelte"
	import { formatMoney } from "$lib/common/utility"

	export let cart: CartFragment
	export let collections: CollectionConnection

	const lines = cart.lines.edges
		.map(edge => edge.node)
		.map(line => {
			const product = collections.edges.flatMap(edge => edge.node.products)

			//.edges.map(edge => edge.node))
			// .find(product => product.id === line.merchandise.id
			return { line, product }
		})
</script>

<p class="whitespace-pre">
	{JSON.stringify(cart, null, 4)}
</p>

<p>
	<b>Total:</b>
	<span>{formatMoney(cart.estimatedCost.totalAmount.amount)}</span>
</p>

{#each lines as { line, product }}
	{line.quantity}
	{product}
{/each}

<Link class="inline-block" primary blob href={cart.checkoutUrl}>Checkout</Link>

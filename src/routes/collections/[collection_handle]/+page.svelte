<script lang="ts">
	import type { PageData } from "./$types"
	import { formatMoney } from "$lib/common/utility"

	export let data: PageData

	$: ({ collection } = data)

	$: console.log({ collection })
</script>

<h1 class="text-dark pt-4 text-4xl">{collection.title}</h1>
<div class="text-dark space-y-2 my-4">{@html collection.descriptionHtml}</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-black">
	{#each collection.products.edges.map(edge => edge.node) as { title, images, handle, priceRange }}
		<a href="/collections/{collection?.handle}/products/{handle}" class="space-y-2">
			<img class="w-full h-auto" src={images.edges[0].node.url} alt={images.edges[0].node.altText} />
			<h2 class="text-center font-bold">{title}</h2>
			<span class="text-sm">Base Price: {formatMoney(priceRange.minVariantPrice.amount)}</span>
		</a>
	{/each}
</div>

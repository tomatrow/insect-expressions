<script lang="ts">
	import type { PageData } from './$types';
	import { formatMoney } from "$lib/common/utility"

	export let data: PageData
	
	$: ({ product } = data)
	
	console.log({ data })
</script>

<h1 class="text-dark pt-4 text-4xl">{product.title}</h1>
<div class="text-dark space-y-2 my-4">{@html product.descriptionHtml}</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-black">
	{#if product}
		<a href="/products/{product.handle}" class="space-y-2">
			<img
				class="w-full h-auto"
				src={product.images.edges[0].node.originalSrc}
				alt={product.images.edges[0].node.altText}
			/>
			<h2 class="text-center font-bold">{product.title}</h2>
			<span class="text-sm">Base Price: {formatMoney(product.priceRange.minVariantPrice.amount)}</span>
		</a>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from "./$types"
	import { enhance } from "$app/forms"
	import { formatMoney } from "$lib/common/utility"

	export let data: PageData

	console.log({ data: data.product })
</script>

<h1 class="text-dark pt-4 text-4xl">{data.product.title}</h1>
<div class="text-dark space-y-2 my-4">{@html data.product.descriptionHtml}</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-black">
	{#if data.product}
		<a href="/products/{data.product.handle}" class="space-y-2">
			<img
				class="w-full h-auto"
				src={data.product.images.edges[0].node.url}
				alt={data.product.images.edges[0].node.altText}
			/>
			<h2 class="text-center font-bold">
				<span>{data}</span>
				<br />
				<span>{data.product.title}</span>
			</h2>
			<span class="text-sm">Base Price: {formatMoney(data.product.priceRange.minVariantPrice.amount)}</span>
		</a>
		<form method="POST" action="/cart?/add" use:enhance>
			<label>
				<p>Variant:</p>
				<select name="id">
					{#each data.product.variants.edges.map(edge => edge.node) as { id, title }}
						<option value={id}>
							{title}
						</option>
					{/each}
				</select>
			</label>
			<button>Add</button>
		</form>
	{/if}
</div>

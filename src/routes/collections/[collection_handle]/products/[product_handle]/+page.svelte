<script lang="ts">
	import type { PageData } from "./$types"
	import { enhance } from "$app/forms"
	import { formatMoney } from "$lib/common/utility"

	export let data: PageData

	$: console.log({
		options: data.product.options
	})
</script>

<div>
	<span class="text-dark text-4xl">{data.collection.title}</span>
	<h1 class="text-dark pt-4 text-4xl">{data.product.title}</h1>
</div>
<div class="text-dark space-y-2 my-4">{@html data.product.descriptionHtml}</div>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 text-black">
	{#if data.product}
		<div class="space-y-2">
			<img
				class="w-full h-auto"
				src={data.product.images.edges[0].node.url}
				alt={data.product.images.edges[0].node.altText}
			/>
			<h2 class="text-center font-bold">{data.product.title}</h2>
			<span class="text-sm">Base Price: {formatMoney(data.product.priceRange.minVariantPrice.amount)}</span>
		</div>

		<form method="POST" action="/customizer/{data.product}/" use:enhance>
			<button>Customize</button>
		</form>
	{/if}
</div>

<!-- 
	
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
	
	<form method="POST" action="/cart?/add-via-options" use:enhance>
		<input type="hidden" name="product_id" value={data.product.id} />
	
		{#each data.product.options as { name, values }}
			<label>
				<p>
					{name}
				</p>
				<select {name}>
					{#each values as value}
						<option {value}>
							{value}
						</option>
					{/each}
				</select>
			</label>
		{/each}
	
		<button>Add</button>
	</form>
	
 -->

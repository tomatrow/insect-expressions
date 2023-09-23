<script lang="ts">
	import { isEqual } from "lodash"
	import { isNotNil } from "$lib/common/utility"
	import type { CustomizerAccessoryStep } from "$lib/common/customizer"
	import { valueMatchesConstraints, isCustomizerAccessorySelectionData } from "$lib/common/customizer"
	import { page } from "$app/stores"

	export let step: CustomizerAccessoryStep

	$: {
		const selectionData = $page.data.customizer?.selections[step.handle]
		if (isCustomizerAccessorySelectionData(selectionData)) {
		}
	}

	$: productHandles =
		$page.data.collections
			?.find(collection => collection.handle === step.collection)
			?.products.edges.map(edge => edge.node.handle) ?? []
</script>

Choose: {step.min} - {step.max}

{#each productHandles
	.map(productHandle => $page.data.products?.[productHandle])
	.filter(isNotNil) as product, index (product.handle)}
	<div>
		<input type="hidden" name="selections[{index}].handle" value={product.handle} />

		<label class="flex items-center gap-2">
			<input type="number" min={0} max={step.max} name="selections[{index}].count" value={0} />
			<h6>{product.title}</h6>
		</label>

		{#each product.options as option (option.id)}
			{@const constraint =
				step.optionConstraints?.find(
					constraint => constraint.handle === product.handle && constraint.name === option.name
				) ?? {}}
			{@const values = option.values.filter(value => valueMatchesConstraints(value, constraint ?? {}))}

			{#if values.length && !isEqual(values, ["Default Title"])}
				<label class="ml-12">
					{option.name}
					<select name="selections[{index}].options[{option.name}]">
						{#each values as value}
							<option {value}>{value}</option>
						{/each}
					</select>
				</label>
			{/if}
		{/each}
	</div>
{/each}

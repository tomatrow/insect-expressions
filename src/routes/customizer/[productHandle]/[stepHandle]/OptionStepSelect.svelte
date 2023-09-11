<script lang="ts">
	import {
		type CustomizerOptionStep,
		type CustomizerSelections,
		valueMatchesConstraints,
		isCustomizerOptionSelectionData
	} from "$lib/common/customizer"
	import type { ProductOption } from "$lib/types/shopify-storefront.type"
	import { page } from "$app/stores"

	$: console.log({ pageData: $page.data })

	export let step: CustomizerOptionStep
	export let options: ProductOption[]
	export let selections: CustomizerSelections

	$: selectedValue = getSelectedValue(step, selections)
	$: values = getOptionValues(step, options)

	function getOptionValues(step: CustomizerOptionStep, options: ProductOption[]) {
		return (
			options
				.find(option => (option.name = step.optionConstraint.name))
				?.values.filter(value => valueMatchesConstraints(value, step.optionConstraint)) ?? []
		)
	}

	function getSelectedValue(step: CustomizerOptionStep, selections: CustomizerSelections) {
		const selection = selections[step.handle]
		return isCustomizerOptionSelectionData(selection) ? selection.value : undefined
	}
</script>

<label class="block">
	<b>Value:</b>
	<select name="value" required>
		{#each values as value}
			<option {value} selected={selectedValue === value}>{value}</option>
		{/each}
	</select>
</label>

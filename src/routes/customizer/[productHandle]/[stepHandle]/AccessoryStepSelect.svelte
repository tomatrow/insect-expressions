<script lang="ts">
	import { enhance } from "$app/forms"
	import type { CustomizerAccessoryStep } from "$lib/common/customizer"
	import { valueMatchesConstraints } from "$lib/common/customizer"
	import type { ProductOption } from "$lib/types/shopify-storefront.type"

	export let step: CustomizerAccessoryStep
	// export let options: ProductOption[]

	// $: option = options.find(option => (option.name = step.optionConstraint.name))
	// $: values = option?.values.filter(value => valueMatchesConstraints(value, step.optionConstraint)) ?? []
</script>

<!-- <select name="value">
		{#each values as value}
			<option {value}>{value}</option>
		{/each}
	</select> -->

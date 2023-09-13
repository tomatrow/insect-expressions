<script lang="ts">
	import { enhance } from "$app/forms"
	import type { PageData, ActionData } from "./$types"
	import { CustomizerStepType } from "$lib/common/customizer"
	import OptionStepSelect from "./OptionStepSelect.svelte"
	import AccessoryStepSelect from "./AccessoryStepSelect.svelte"

	export let data: PageData
	export let form: ActionData

	$: ({ product, customizer } = data)
	$: ({ stepHandle, selections } = customizer)
	$: ({ options } = product)

	$: ({ steps, order } = product.customizerConfig)
	$: orderedSteps = order.map(handle => steps[handle])
	$: index = order.indexOf(stepHandle)
	$: previousStep = orderedSteps[index - 1]
	$: step = orderedSteps[index]
	$: nextStep = orderedSteps[index + 1]
</script>

<div>
	{#if form}
		<h5>Form:</h5>
		<pre>
			{JSON.stringify(form, null, 2)}
		</pre>
		<hr />
	{/if}

	<hr />

	<div>
		<a href={previousStep ? `/customizer/${product.handle}/${previousStep.handle}` : "#"}>previous</a>
		<a href={nextStep ? `/customizer/${product.handle}/${nextStep.handle}` : "#"}>next</a>
	</div>

	<hr />

	<h2>{step.name}</h2>

	<form
		method="post"
		action="?/selectOption"
		use:enhance={() => {
			// prevent default callback from resetting the form
			return ({ update }) => update({ reset: false })
		}}
	>
		<input type="hidden" name="type" value={step.type} />

		{#if step.type === CustomizerStepType.OPTION}
			<OptionStepSelect {step} {options} {selections} />
		{:else}
			<AccessoryStepSelect {step} />
		{/if}

		<button>Select</button>
	</form>

	<p>
		<b>Config:</b>
		<span class="whitespace-pre">
			{@html JSON.stringify(data.product.customizerConfig, null, 4)}
		</span>
	</p>
</div>

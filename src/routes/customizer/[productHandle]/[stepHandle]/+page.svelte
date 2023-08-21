<script lang="ts">
	import type { 
		PageData, 
		// ActionData 
	} from "./$types"
	
	export let data: PageData
	// export let form: ActionData;

	$: ({ product, stepHandle } = data)
	$: ({ steps, order } = product.customizerConfig)
	$: orderedSteps = order.map(handle => steps[handle])
	$: index = order.indexOf(stepHandle)
	$: previous = orderedSteps[index - 1]
	$: current = orderedSteps[index]
	$: next = orderedSteps[ index + 1 ]
</script>


<div>
	<div>
		<p>
			<b>Handle:</b>
			{product.handle}
		</p>

		{#if previous}
			<a href="/customizer/{product.handle}/{previous.handle}">previous</a>
		{/if}

		{#if next}
			<a href="/customizer/{product.handle}/{next.handle}">next</a>
		{/if}

		<p>
			<b>Step:</b>
			{current.handle}
		</p>
		
		<p>
			<b>Config:</b>
			<span class="whitespace-pre">
				{@html JSON.stringify(data.product.customizerConfig, null, 2)}
			</span>
		</p>
		
	</div>
</div>



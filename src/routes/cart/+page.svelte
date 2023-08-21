<script lang="ts">
	import { enhance } from "$app/forms"
	import type { PageData } from "./$types"
	import CartView from "./CartView.svelte"

	export let data: PageData
</script>

<section>
	<form
		use:enhance={() =>
			({ update }) =>
				update({ reset: false })}
		method="post"
		action="?/updateNote"
	>
		<input name="note" value={data.cart?.note ?? ""} />
		<button>Update Note</button>
	</form>

	<form use:enhance method="POST" action="?/clear">
		<button>Clear</button>
	</form>

	{#if data.cart}
		<CartView cart={data.cart} collections={data.collections} />
	{/if}
</section>

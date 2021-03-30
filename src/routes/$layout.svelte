<script lang="ts">
	import "../global.css";
    import checkout, { createCheckout } from "$common/checkout"
    import { onMount } from 'svelte'

	onMount(async () => {
        checkout.useLocalStorage()
        if ($checkout) return 
        await createCheckout()
	});
        
    $: console.log($checkout)
</script>

<main class="w-11/12 mx-auto min-h-screen">
    <slot />
</main>
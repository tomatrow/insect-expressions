<script lang="ts">
    import "../app.postcss"
    import checkout, { createCheckout } from "../common/checkout"
    import { onMount } from "svelte"
    import Header from "$lib/app/Header.svelte"
    import Footer from "$lib/app/Footer.svelte"

    onMount(async () => {
        checkout.useLocalStorage()
        if ($checkout) return
        await createCheckout()
    })

    let height: string

    $: console.log($checkout)
</script>

<Header bind:height />
<main class="mx-auto w-11/12" style="margin-top: {height}; min-height: calc(100vh-{height})">
    <slot />
</main>
<Footer />

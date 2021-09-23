<script lang="ts">
    import "../app.postcss"
    import checkout, { createCheckout } from "$lib/common/checkout"
    import { onMount } from "svelte"
    import { Main, Header, Footer } from "$lib/components"

    onMount(async () => {
        checkout.useLocalStorage()
        if ($checkout) return
        await createCheckout()
    })

    let height: string

    $: console.log($checkout)
</script>

<Header bind:height />
<Main class="mx-auto w-11/12" style="margin-top: {height}; min-height: calc(100vh-{height})">
    <slot />
</Main>
<Footer class="py-10 px-5 w-full" />

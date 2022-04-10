<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    import { installFetch } from "optional-default-site-kit/functions/request"
    import { getShop } from "$lib/graphql/shop.gq"

    export const load: Load = async ({ fetch }) => {
        installFetch(fetch)
        await getShop({ fetch })
        return { status: 200 }
    }
</script>

<script lang="ts">
    import "../app.css"
    import checkout, { createCheckout } from "$lib/common/checkout"
    import { onMount } from "svelte"
    import { shop } from "$lib/graphql/shop.gq"
    // import { Main, Header, Footer } from "$lib/components"
    

    onMount(async () => {
        // checkout.useLocalStorage()
        // if ($checkout) return
        // await createCheckout()
    })

    let height: string

    // $: console.log($checkout)
</script>

<!-- <Header bind:height /> -->
<!-- <Main class="mx-auto w-11/12" style="margin-top: {height}; min-height: calc(100vh-{height})"> -->
    <slot />
<!-- </Main> -->
<!-- <Footer class="py-10 px-5 w-full" /> -->

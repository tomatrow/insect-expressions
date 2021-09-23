<script>
    import { dev } from "$app/env"
    import Layout from "./__layout.svelte"
    import { Section, Header } from "$lib/components"

    export let error, status
</script>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<Layout>
    <Section class="col-md-9">
        <Header>{status}</Header>

        <p>{error?.message}</p>

        {#if dev && error?.stack}
            <pre>{error.stack}</pre>
        {/if}
    </Section>
</Layout>

<style>
    h1,
    p {
        margin: 0 auto;
    }
    h1 {
        margin: 0 0 0.5em 0;
        font-weight: 700;
        font-size: 2.8em;
    }
    p {
        margin: 1em auto;
    }
    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>

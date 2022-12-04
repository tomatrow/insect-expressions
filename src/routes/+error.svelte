<script lang="ts">
    import { Section, Header } from "$lib/components"
	import { page } from '$app/stores'
</script>

<svelte:head>
    <title>{$page.status}</title>
</svelte:head>

<Section class="col-md-9">
    <Header>{$page.status}</Header>
    <p>{$page.error?.message}</p>
</Section>

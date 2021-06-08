<script lang="ts">
    import Link from "$lib/components/Link.svelte"
    import { FacebookIcon, InstagramIcon } from "../feather"
    import { onMount } from "svelte"

    export let platform: "instagram" | "facebook"
    export let title: string
    export let url: string
    export let useIcon = true

    const iconByPlatform = {
        facebook: FacebookIcon,
        instagram: InstagramIcon
    }
</script>

<Link primary target="_blank" href={url}>
    {#if useIcon}
        <svelte:component this={iconByPlatform[platform]} class="w-4 h-4" />
    {:else}
        {title}
    {/if}
</Link>

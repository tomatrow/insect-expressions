<script lang="ts" context="module">
    // import { FacebookIcon, InstagramIcon } from "../feather"
    import type { Platform } from "$lib/types/utility.type"
    import type { SvelteComponent } from "svelte"

    // const iconByPlatform: Record<Platform, typeof SvelteComponent> = {
    //     facebook: FacebookIcon,
    //     instagram: InstagramIcon
    // }
</script>

<script lang="ts">
    export let platform: Platform
</script>

<!-- <svelte:component this={iconByPlatform[platform]} class="w-4 h-4" /> -->

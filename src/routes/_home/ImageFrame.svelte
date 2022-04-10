<script lang="ts">
    import type { Image } from "$lib/types/utility.type"

    export let fullDark = false
    export let image: Image
</script>

<section class="p-2 relative">
    <div style:aspect-ratio="1" class="relative z-0 flex justify-center items-center p-1 {fullDark ? 'border' : 'border-2' }">
        <div class="p-2">
            <slot />
        </div>
    </div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="inset-0 absolute z-[-1] w-full h-full" {...image} />
</section>


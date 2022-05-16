<script lang="ts">
    import type * as Utility from "$lib/types/utility.type"
    import { Link } from "$lib/components"

    export let title: string = ""
    export let image: Utility.Image = { src: "https://source.unsplash.com/random/?insect" }
    export let link: Utility.Link = { href: "#", title: "Shop this collection >>" }
    export let reverse: boolean = false
    let clazz = ""
    export { clazz as class }
</script>

<section class="container mx-auto grid sm:grid-cols-2 gap-4 sm:gap-0 max-h-[37rem] {clazz}" style="aspect-ratio: 2 / 1">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a {...link}>
        <img class="mx-auto aspect-square object-cover w-full max-w-xs sm:max-w-none sm:min-h-0"  {...image} />
    </a>
    <div class="px-4 sm:px-0 mx-auto max-w-sm sm:max-w-none text-center flex flex-col justify-center items-center sm:mr-auto gap-2 md:gap-2 lg:gap-4" class:sm:row-start-1={reverse}>
        {#if title}
            <h2 class="text-2xl sm:text-xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
        {/if}
        {#if $$slots.default}
            <p class="md:text-2xl lg:text-3xl">
                <slot />
            </p>
        {/if}
        <Link secondary blob {...link} />
    </div>
</section>

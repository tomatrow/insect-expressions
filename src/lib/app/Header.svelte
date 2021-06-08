<script lang="ts">
    import type { Collection } from "shopify-storefront-api-typings"
    import { graphql, query } from "../../common/query"
    import { preloadImage } from "../../common/utility"
    import { fade, slide } from "svelte/transition"
    import { quartInOut } from "svelte/easing"
    import { SearchMajor, CartMajor, CustomersMajor, CaretDownMinor } from "../polaris"
    import type { Section } from "../../common/sections"
    import { loadSection, filterBlocks } from "../../common/sections"
    import Link from "$lib/components/Link.svelte"
    import SocialLink from "$lib/components/SocialLink.svelte"
    import { onMount } from "svelte"

    export const height = "10rem"

    let global: Section
    let header: Section
    let collections: Collection[] = []

    let Carousel: typeof import("svelte-carousel/src/components/Carousel/Carousel.svelte").default
    onMount(async () => {
        loadSection({ id: "header" }).then(section => (header = section))
        loadSection({ id: "global" }).then(section => (global = section))
        collectionQuery().then(items => (collections = items))
        Carousel = (await import("svelte-carousel/src/components/Carousel/Carousel.svelte")).default
    })

    let hoverIndex: number
    $: activeList = header?.linklists[header.settings.primaryNavigation][hoverIndex]

    async function collectionQuery() {
        const { data } = await query(graphql`
            {
                collections(first: 250) {
                    edges {
                        node {
                            id
                            handle
                            image {
                                id
                                altText
                                originalSrc
                            }
                        }
                    }
                }
            }
        `)
        return data?.collections.edges.map(edge => edge.node)
    }

    function getCollection(href: string, collections: Collection[]) {
        const url = new URL(href)
        const [_, parent, handle] = url.pathname.split("/")
        if (!(parent === "collections")) return
        return collections.find(collection => collection.handle === handle)
    }

    $: collections?.forEach(collection => {
        const url = collection.image?.originalSrc
        if (url) preloadImage(url)
    })
</script>

{#if header && global}
    <header
        class="fixed top-0 right-0 left-0 flex flex-col w-full"
        on:mouseleave={() => (hoverIndex = null)}
    >
        <div class="bg-light flex flex-col">
            <div class="flex justify-between">
                <div class="space-x-4 flex items-start py-1 w-full">
                    {#each ["instagram", "facebook"] as platform}
                        <SocialLink {platform} url={global.settings[platform]} />
                    {/each}
                    <SearchMajor class="w-4 h-4" style="margin-right: auto" />
                    <CartMajor class="w-4 h-4" />
                    <CustomersMajor class="w-4 h-4" />
                </div>
            </div>
            <ul class="space-x-4 flex justify-center py-5">
                {#if header.settings.primaryNavigation}
                    {#each header.linklists[header.settings.primaryNavigation] as { title, url, children }, index}
                        <li
                            class="flex items-center"
                            style="order: {index}"
                            on:mouseenter={() => (hoverIndex = index)}
                        >
                            <Link href={url} class="space-x-0.5 flex items-center">
                                <span>{title}</span>
                                {#if children.length}
                                    <CaretDownMinor class="w-4 h-4" />
                                {/if}
                            </Link>
                        </li>
                    {/each}
                {/if}
                <li
                    style="order: {header.linklists[header.settings.primaryNavigation]?.length / 2 -
                        1}"
                >
                    <a href="/"><img class="h-12" src={global.settings.logo} /></a>
                </li>
            </ul>
            <div class="relative w-full">
                {#if activeList?.children.length}
                    <ul
                        in:fade={{ duration: 400 }}
                        out:slide={{ duration: 200 }}
                        class="bg-light space-x-4 z-50 flex justify-around"
                        style="box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2)"
                    >
                        {#each activeList.children as { title, url, children }, index}
                            <li class="flex flex-col" style="flex-grow: 1; flex-basis: 0">
                                {#if getCollection(url, collections)}
                                    <img
                                        in:slide={{
                                            duration: index * 100 + 100,
                                            easing: quartInOut
                                        }}
                                        class="h-32 object-cover object-center"
                                        src={getCollection(url, collections).image.originalSrc}
                                        alt={getCollection(url, collections).image.altText}
                                    />
                                {/if}
                                <Link class="text-lg" href={url}>{title}</Link>
                                {#each children as { title, url }}
                                    <Link href={url}>{title}</Link>
                                {/each}
                            </li>
                        {/each}
                    </ul>
                {/if}
                {#if Carousel}
                    <div class="absolute top-0" style="z-index: -1">
                        <Carousel arrows={false} autoplay dots={false} duration={1500}>
                            {#each filterBlocks("banner", header) as { title }}
                                <span class="py-2 w-full bg-black text-white text-center"
                                    >{@html title}</span
                                >
                            {/each}
                        </Carousel>
                    </div>
                {/if}
            </div>
        </div>
    </header>
{/if}

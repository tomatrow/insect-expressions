<script lang="ts">
    import type { Section } from "../../common/sections"
    import { loadSection, filterBlocks } from "../../common/sections"
    import Button from "../components/Button.svelte"
    import Link from "$lib/components/Link.svelte"
    import SocialLink from "$lib/components/SocialLink.svelte"
    import { onMount } from "svelte"

    let section: Section
    onMount(async () => (section = await loadSection({ id: "footer" })))
</script>

<footer
    class="text-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10 divide-y divide-primary md:divide-y-0 py-10 px-5"
>
    {#each filterBlocks("link_group", section) as { __linklists, links, title }}
        <div class="space-y-1 flex items-center md:items-start flex-col py-10 md:py-0">
            <h3 class="hidden md:block mb-4 font-bold">{title}</h3>
            {#each __linklists[links] as { title, url }}
                <Link secondary href={url}>{title}</Link>
            {/each}
        </div>
    {/each}

    {#if filterBlocks("social", section).length > 0}
        <div
            class="space-y-1 flex items-center md:items-start flex-col justify-center md:justify-start py-8 md:py-0"
        >
            <h3 class="hidden md:block mb-4 font-bold">
                {section?.settings.socialLinkListTitle ?? ""}
            </h3>
            <div class="space-x-2 flex justify-center">
                {#each filterBlocks("social", section) as { platform, title, url, useIcon }}
                    <SocialLink {platform} {title} {url} {useIcon} />
                {/each}
            </div>
        </div>
    {/if}

    <form
        method="post"
        action="/contact#contact_form"
        class="space-y-3 flex items-start items-center md:items-start flex-col"
    >
        <h3 class="hidden sm:block mb-4 font-bold">Newsletter</h3>
        <span class="text-center md:text-left"
            >Receive offers new products, and interesting content.</span
        >

        <input
            type="email"
            placeholder="Your email"
            class="px-2 rounded"
            name="contact[email]"
            aria-label="Your email"
            autocorrect="off"
            autocapitalize="off"
        />
        <input type="hidden" name="utf8" value="✓" />
        <input type="hidden" name="contact[tags]" value="newsletter" />
        <input type="hidden" name="form_type" value="customer" />

        <Button class="" secondary blob type="submit">Subscribe</Button>
    </form>
</footer>

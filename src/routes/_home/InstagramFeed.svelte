<script lang="ts">
    import { request } from "optional-default-site-kit/functions/request"
    import { scale } from "svelte/transition"
    import { onMount } from "svelte"
    
    let feed: any
    
    async function loadFeed() {
        try {
            const response: string = await request(import.meta.env.VITE_INSTANT_TOKENS_ENDPOINT as string)
            const { Token } = JSON.parse(response) // they don't use content-type header

            const url = new URL("https://graph.instagram.com/me/media")
            url.search = new URLSearchParams({
                fields:
                    "caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username",
                limit: "6",
                access_token: Token
            }).toString()

            feed = await request(url.toString())
        } catch (error) {
            console.error(error)
        }
    }

    onMount(() => loadFeed())
</script>

<section class="xl:container mx-auto space-y-8">
    {#if feed}
        <div transition:scale class="grid gap-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 py-2">
            {#each feed.data as { media_url, permalink, caption }}
                <a href={permalink} target="_blank">
                    <img src={media_url} alt={caption} />
                </a>
            {/each}
        </div>
    {/if}
</section>


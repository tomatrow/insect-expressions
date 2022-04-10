<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    export const load: Load = ({ url }) => {
        return {
            props: {
                url
            }
        }
    }
</script>

<script lang="ts">
    export let url: URL
    console.log(url)
</script>

<div>Hello from {url}</div>

<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit"
    export const load: Load = ({ page }) => {
        return {
            props: {
                path: page.path
            }
        }
    }
</script>

<script lang="ts">
    export let path: string
    console.log(path)
</script>

<div>Hello from {path}</div>

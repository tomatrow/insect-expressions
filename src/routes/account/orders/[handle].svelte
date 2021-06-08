<script lang="ts" context="module">
    import type { LoadInput, LoadOutput } from "@sveltejs/kit/types.internal"
    export async function load({ page }: LoadInput): Promise<LoadOutput> {
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

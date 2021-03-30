<script lang="ts" context="module">
    import type { LoadOptions, Loaded } from "../../../../types/index.type"
    export async function load(options: LoadOptions): Promise<Loaded> {
        return {
            props: {   
                path: options.page.path
            }
        }
    }
</script>

<script lang="ts">
    export let path: string
    console.log(path)
</script>

<div>Hello from {path}</div>
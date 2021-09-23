<script lang="ts" context="module">
    import { writable } from 'svelte/store'
    import { handle, getSession } from "../../hooks"
    import { noop } from "svelte/internal"
    
    export const stores = {
        page: writable({ path: '/' }),
        navigating: writable(),
        session: writable()
    }
    
    export async function getMockSession() {
        const request = { locals: {} }
        const resolve = noop
        // @ts-ignore
        await handle({ request, resolve })
        // @ts-ignore
        return await getSession(request)
    }
</script>

<script lang="ts">
    import { setContext } from 'svelte'

    const { session } = stores
    setContext('__svelte__', stores)
    
    if (!$session)
        getMockSession().then(result => $session = result)
</script>

{#if $session}
    <slot />
{/if}
<script lang="ts">
    import type { UnderlineActionParameters } from "$lib/actions"
    import { bridge, underline } from "$lib/actions"
    import { makeClasses } from "$lib/components/Button/index.svelte"

    export let primary = false
    export let secondary = false
    export let blob = false
    let clazz = ""
    let zunderline: UnderlineActionParameters = undefined
    export { clazz as class, zunderline as underline }

    export let href: string
    export let title: string = undefined

    $: classes = makeClasses({ primary, secondary, blob })
</script>

<a
    use:bridge={{ enable: !!zunderline, action: underline, parameters: zunderline }}
    class="{classes} {clazz}"
    {href}
    on:click
    {...$$restProps}
>
    {#if $$slots.default}
        <slot {title} />
    {:else if title}
        {title}
    {/if}
</a>

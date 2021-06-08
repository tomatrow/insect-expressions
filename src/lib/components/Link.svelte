<script lang="ts">
    import type { UnderlineActionParameters } from "../../actions"
    import { bridge, underline } from "../../actions"
    import { makeClasses } from "./Button.svelte"

    export let primary = false
    export let secondary = false
    export let blob = false
    let clazz = ""
    let zunderline: UnderlineActionParameters = undefined
    export { clazz as class, zunderline as underline }

    export let href: string

    $: classes = makeClasses({ primary, secondary, blob })
</script>

<a
    use:bridge={{ enable: !!zunderline, action: underline, parameters: zunderline }}
    class="{classes} {clazz}"
    {href}
    on:click
    {...$$restProps}><slot /></a
>

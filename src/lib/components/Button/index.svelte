<script context="module">
    import { build } from "optional-default-site-kit"
	
	export function makeClasses(
        { primary, secondary, blob } = { primary: false, secondary: false, blob: false }
    ) {
        return build(
            primary && ((blob && "bg-primary hover:bg-primary-600") || "hover:text-primary"),
            secondary &&
                ((blob && "bg-secondary hover:bg-secondary-600") || "hover:text-secondary"),
            blob && (primary || secondary) && "rounded p-2 text-light font-semibold",
            (primary || secondary) && "transition duration-400 ease-out"
		)
    }
</script>

<script lang="ts">
    // import type { UnderlineActionParameters } from "$lib/actions"
    // import { bridge, underline } from "$lib/actions"

    export let type: "button" | "submit" | "reset" = "button"

    export let primary = false
    export let secondary = false
    export let blob = false
    let clazz = ""
    // let zunderline: UnderlineActionParameters | boolean = undefined
    export { clazz as class, 
        // zunderline as underline 
    }

    $: classes = makeClasses({ primary, secondary, blob })
</script>

<!--     use:bridge={{
        enable: !!zunderline,
        action: underline,
        parameters: typeof zunderline === "boolean" ? {} : zunderline
    }} -->
<button
    class="{clazz} {classes}"
    {type}
    on:click
    {...$$restProps}><slot /></button
>

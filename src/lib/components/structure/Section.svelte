<script lang="ts">
    import { incrementHeadingLevel } from "./utility"

    incrementHeadingLevel()

    export let style = undefined
    let clazz = undefined
    export { clazz as class }
</script>

<section class={clazz} {style}>
    <slot />
</section>

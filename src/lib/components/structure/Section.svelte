<script lang="ts">
    import { incrementHeadingLevel } from "./utility"

    incrementHeadingLevel()

    export let style = ""
    let clazz = ""
    export { clazz as class }
</script>

<section class={clazz} {style}>
    <slot />
</section>

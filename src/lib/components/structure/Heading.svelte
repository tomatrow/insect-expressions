<script lang="ts">
    import { getHeadingContext } from "./utility"

    let clazz = ""
    export { clazz as class }

    const { level } = getHeadingContext()
</script>

{#if level === 1}
    <h1 class={clazz}>
        <slot />
    </h1>
{:else if level === 2}
    <h2 class={clazz}>
        <slot />
    </h2>
{:else if level === 3}
    <h3 class={clazz}>
        <slot />
    </h3>
{:else if level === 4}
    <h4 class={clazz}>
        <slot />
    </h4>
{:else if level === 5}
    <h5 class={clazz}>
        <slot />
    </h5>
{:else}
    <h6 class={clazz}>
        <slot />
    </h6>
{/if}

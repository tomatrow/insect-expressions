<script lang="ts">
    let clazz = ""
    export { clazz as class }
</script>

<section class="aspect-square leading-tight tracking-wide bg-cover relative text-white bg-no-repeat {clazz}">
    <slot />
</section>

<style lang="postcss">
    section {
        background-image: 
            linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),
            var(--image)
        ;
        
        &:before {
            content: "";
            border-color: var(--border);
            @apply pointer-events-none z-10 inset-0 m-4 border absolute;
        }
    }
</style>

<script lang="ts">
    let clazz = ""
    export { clazz as class }
    const content = `
        Nothing compares to walking in the woods, 
        but to adorn one's home with glimpses of nature satisfies that
        ever-present longing—if only for a moment.
    `
</script>

<div class="container mx-auto">
    <section class="flex items-center bg-no-repeat bg-cover w-full p-1 sm:p-4 bg-[position:center_90%] aspect-video {clazz}" style:background-image="url(/images/home/dome-by-tree.webp)">
        <p class="text-muted sm:p-4 w-[40%] sm:w-1/3 sm:ml-[5%] sm:text-xl md:text-4xl lg:text-5xl xl:text-6xl text-center" style:background="linear-gradient(rgba(89,68,51,0.7),rgba(89,68,51,0.7))">{content}</p>
    </section>
</div>

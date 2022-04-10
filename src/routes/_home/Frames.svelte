<script lang="ts">
    import Frame from "./Frame.svelte"
    import Link from "$lib/components/Link.svelte"
    // import * as x from "../../"
</script>

<section class="flex flex-col sm:flex-row sm:gap-4 sm:px-4 items-center w-full" >
    <Frame --image="url(/images/mantis.jpg)" --border="white"  class="w-full p-8 flex flex-col justify-end items-end text-right">
        <h3 class="font-bold text-2xl">Request a Species</h3>
        <p>Don't see the species <br /> you wanted? <br /> Let me know!</p>
        <Link secondary blob href="#" class="my-4">Submit Request {">>"}</Link>    
    </Frame>
    
    <Frame --image="url(/images/mushrooms.jpg)" --border="brown" class="w-full p-8 flex flex-col justify-end items-center text-center">
        <h3 class="font-bold text-2xl">Custom Order</h3>
        <p>I will work with you <br /> to create a design <br /> that you love.</p>
        <Link secondary blob href="#" class="my-4">Get Started {">>"}</Link>    
    </Frame>
</section>

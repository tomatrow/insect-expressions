<script lang="ts">
    import Hero from "./_home/Hero.svelte"
    import CollectionRows from "./_home/CollectionRows.svelte"
    import Frames from "./_home/Frames.svelte"
    import Quote from "./_home/Quote.svelte"
    import InstagramFeed from "./_home/InstagramFeed.svelte"
</script>


<Hero />
   
<section class="container mx-auto my-32">
    <p class="text-center font-light mx-auto max-w-2xl text-3xl">
        Immerse yourself in the tranquility of a quiet forest through the natural beauty of handcrafted insect art décor.
    </p>
</section> 

<CollectionRows />
    
    
<section class="container mx-auto my-32 flex flex-col items-center jutify-center gap-4 px-4">
    <h2 class="font-bold text-xl sm:text-4xl">Uniquely Yours:</h2>
    <p class="text-center font-light mx-auto max-w-2xl text-lg sm:text-3xl">
        You choose your insect specimens and stylistic accents, so each design reflects your unique style.
    </p>
</section> 

<Frames />

<Quote class="sm:my-32" />

<section class="container mx-auto my-16 sm:mt-32">
    <h2 class="text-center text-4xl">
        <a target="_blank" href="https://www.instagram.com/insectexpressions">@insectexpressions</a>
    </h2>
</section>

<InstagramFeed />

<!-- <div>Hello from {path}</div>
<div class="flex flex-col">
    <a href="/collections/impressive-proportions">Impressive Proportions</a>
    <a href="/collections/dazzling-deception">Dazzling Deception</a>
    <a href="/collections/a-hidden-world">A Hidden world</a>
    <a target="_blank" rel="external" href="/policies/refund-policy">Refund Policy</a>
    <a target="_blank" rel="external" href="/policies/privacy-policy">Privacy Policy</a>
    <a target="_blank" rel="external" href="/policies/terms-of-service">Terms of Service</a>
    <a href="/pages/request-a-species">Request a Species</a>
    <a href="/pages/care">Care Guide</a>
    <a href="/pages/contact">Contact</a>
    <a href="/pages/submit-a-custom-order">Custom Order</a>
    <a href="/pages/subscription-sign-up">Subscription Sign Up</a>
     <a href="/account/login">Login</a>
    <a href="/account/register">Register</a> 
    <a href="/cart">Cart</a>
    <a href="/products/insect-expressions-gift-card">Gift Card</a>
    <a target="_blank" href="https://www.instagram.com/insectexpressions/">Instagram</a>
    <a target="_blank" href="https://www.facebook.com/InsectExpressions">Facebook</a>
</div> -->

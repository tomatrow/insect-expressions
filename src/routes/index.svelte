<script lang="ts" context="module">
    import type { LoadOptions, Loaded } from "../types/index.type"
    export async function load(options: LoadOptions): Promise<Loaded> {
        return {
            props: {   
                path: options.page.path
            }
        }
    }
</script>


<script lang="ts">
    export let path: string
    console.log(path)
</script>


<div>Hello from {path}</div>
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
</div>
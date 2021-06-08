/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />


declare module '$lib/feather' {
    const FacebookIcon: SvelteComponent
    const InstagramIcon: SvelteComponent
    export default {
        FacebookIcon,
        InstagramIcon
    }
}

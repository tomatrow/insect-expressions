<script lang="ts">
    import Button from "$lib/components/Button/index.svelte"
</script>

<form
    method="post"
    action="/contact#contact_form"
    class="space-y-3 flex items-start items-center md:items-start flex-col"
>
    <h4 class="hidden sm:block mb-4 font-bold">Newsletter</h4>
    <span class="text-center md:text-left"
        >Receive offers new products, and interesting content.</span
    >

    <input
        type="email"
        placeholder="Your email"
        class="px-2 rounded"
        name="contact[email]"
        aria-label="Your email"
        autocorrect="off"
        autocapitalize="off"
    />
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="contact[tags]" value="newsletter" />
    <input type="hidden" name="form_type" value="customer" />

    <Button secondary blob type="submit">Subscribe</Button>
</form>

<script lang="ts">
	/** @type {import('./$types').PageData} */
    export let data
</script>

<div class="space-y-6 mx-auto py-4 px-5 max-w-3xl">
    <h1 class="text-2xl">{data.page.title}</h1>
    <div class="injected-content">
        {@html data.page.body}
    </div>
</div>

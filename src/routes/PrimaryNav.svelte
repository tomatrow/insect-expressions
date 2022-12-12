<script lang="ts">
	import { build } from "optional-default-site-kit"
	import { Primary, type PrimaryMenu } from "optional-default-floaty-sveltekit-theme"
	
	export let menu: PrimaryMenu
</script>

<Primary class="gap-4" menu={menu} megaClass="bg-muted-400 gap-4 p-4">
	<a
		slot="link" let:href let:label let:level let:compact
		{href}
		class={build(
			level === 0 && "p-4",
			level === 1 && !compact &&"font-black",
			level === 1 && compact && "p-4 duration-200 whitespace-nowrap bg-muted hover:bg-secondary-500",
			level === 2 && compact && "duration-200 p-4 whitespace-nowrap"
		)}>{label}</a
	>
</Primary>
<script lang="ts">
	import { build } from "optional-default-site-kit"
	import { Primary, type PrimaryMenu } from "optional-default-floaty-sveltekit-theme"
	// @ts-expect-error
	import IconChevronDown from '~icons/carbon/chevron-down'

	export let menu: PrimaryMenu
</script>

<Primary class="gap-4" menu={menu} megaClass="bg-muted-400 gap-4 p-4">
	<a
		slot="link" let:href let:label let:level let:compact let:items
		{href}
		class={build(
			"flex items-center",
			level === 0 && "p-4",
			level === 1 && !compact &&"font-black",
			level === 1 && compact && "p-4 duration-200 whitespace-nowrap bg-muted hover:bg-secondary-500",
			level === 2 && compact && "duration-200 p-4 whitespace-nowrap"
		)}>
			<span>{label}</span>
			{#if items?.length}
				<IconChevronDown class="self-end" />
			{/if}
		</a
	>
</Primary>
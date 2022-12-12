<script lang="ts">
    import "../app.css"
	import { Main, PrimaryCompact, Secondary, Navbar } from "optional-default-floaty-sveltekit-theme"
	import ContactForm from "$lib/components/Footer/ContactForm.svelte";
	import { Link } from "$lib/components"
	import { page } from "$app/stores"
	import * as menus from "$lib/data/menus"
	import PrimaryNav from "./PrimaryNav.svelte"

	let open = false
</script>

<Navbar {page} class="bg-muted gap-4 p-4 z-40 flex items-center justify-center">
	<PrimaryNav menu={menus.primaryMenu.slice(0, 2)} />

	<a href="/" class="p-4">
		<img class="max-w-[10rem] sm:max-w-[12rem]" src="/images/logos/insect-expressions-green-text-logo.png" alt="Insect Expressions" />
	</a>

	<PrimaryNav menu={menus.primaryMenu.slice(2)} />
		
	<button class="hide-if-desktop ml-auto" type="button" on:click={() => (open = !open)}>
		menu
	</button>
</Navbar>

<Main>
	<slot />
	<footer
		class="text-dark grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10 divide-y divide-primary md:divide-y-0"
	>
		<a href="/" class="p-8">LOGO</a>
		<Secondary menu={menus.secondaryMenu} class="self-stretch sm:mx-auto sm:max-w-lg sm:w-full">
			<svelte:fragment slot="link" let:href let:label let:level>
				{#if level === 0}
					<h4 class="sm:hidden md:block mb-4 font-bold">{label}</h4>
				{:else}
					<Link secondary {href}>
						{label}
					</Link>
				{/if}
			</svelte:fragment>
		</Secondary>
		<section
			class="gap-y-1 flex items-center md:items-start flex-col justify-center md:justify-start py-8 md:py-0"
		>
			<h4 class="hidden md:block mb-4 font-bold">Social</h4>
			<ul class="gap-x-2 flex justify-center">
				{#each [...Array(3).keys()] as i}
					<li>
						<Link href="#">
							{i}
						</Link>
					</li>
				{/each}
			</ul>
		</section>
		<section>
			<ContactForm />
		</section>
	</footer>
</Main>

{#if open}
	<PrimaryCompact
		{page}
		menu={menus.primaryMenu}
		bind:open
		class="text-dark bg-muted p-4"
		rootClass="bg-light bg-opacity-80 z-50"
	>
		<svelte:fragment slot="link" let:level let:label let:href>
			<a {href} class="hover:underline">{level}-{label}!</a>
		</svelte:fragment>
	</PrimaryCompact>
{/if}

<style global lang="postcss">
	:root {
		--floaty-nav-h: 5rem;
		--floaty-control-color: black;
		--floaty-line-color: black;
	}

	.hide-if-mobile {
		display: none;
	}

	@screen sm {
		.hide-if-desktop {
			display: none;
		}
		.hide-if-mobile {
			display: contents;
		}
	}
</style>
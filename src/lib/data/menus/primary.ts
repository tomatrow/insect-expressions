import type { PrimaryMenu } from "optional-default-floaty-sveltekit-theme"

export const primaryMenu: PrimaryMenu = [
	{
		label: "Shop",
		href: "/collections",
		items: [
			{
				label: "A Hidden World",
				href: "/collections/a-hidden-world",
				src: "/images/home/a-hidden-world.webp",
				items: [
					{
						label: "15x12",
						href: "/collections/a-hidden-world/products/forest-floor-camouflage-insect-display-shadowbox"
					},
					{
						label: "10x10",
						href: "/collections/a-hidden-world/products/10x10-forest-floor-camouflage-insect-display-shadowbox"
					},
					{
						label: "5x5",
						href: "/collections/a-hidden-world/products/5x5-forest-floor-camouflage-insect-display-shadowbox"
					}
				]
			},
			{
				label: "Dazzling Deception",
				href: "/collections/dazzling-deception",
				src: "/images/home/dazzling-owl.webp",
				items: [
					{
						label: "Owl mimicking butterfly",
						href: "/collections/dazzling-deception/products/owl-mimicking-butterfly-display-shadowbox"
					}
				]
			},
			{
				label: "Impressive Proportions",
				href: "/collections/impressive-proportions",
				src: "/images/home/impressive-proportions.webp",
				items: [
					{
						label: "Large branch beetle",
						href: "/collections/impressive-proportions/products/l-axbxc-beetle-on-a-branch-acrylic-insect-display-case"
					},
					{
						label: "Midsize beetle",
						href: "/collections/impressive-proportions/products/axb-beetle-on-a-branch-insect-display-glass-dome"
					},
					{
						label: "Small branch beetle",
						href: "/collections/impressive-proportions/products/axbxc-beetle-on-a-branch-acrylic-insect-display-case"
					}
				]
			}
		]
	},
	{
		label: "About",
		href: "/pages/about"
	},
	{
		label: "Contact",
		href: "/pages/contact",
		items: [
			{
				label: "Submit A Custom Order",
				href: "/pages/submit-a-custom-order"
			},
			{
				label: "Request A Species",
				href: "/pages/request-a-species"
			}
		]
	},
	{
		label: "Care Guide",
		href: "/pages/care"
	}
]

import type { SecondaryMenu } from "optional-default-floaty-sveltekit-theme"

export const secondaryMenu: SecondaryMenu = [
	{
		"label": "Policies",
		href: "#",
		"items": [
			{
				"label": "Return Policy",
				"href": "/policies/return-policy"
			},
			{
				"label": "Privacy Policy",
				"href": "/policies/privacy-policy"
			},
			{
				"label": "Terms of Service",
				"href": "/policies/terms-of-service"
			}
		]
	},
	{
		"label": "Links",
		href: "#",
		"items": [
			{
				"label": "Request A Species",
				"href": "/pages/request-a-species"
			},
			{
				"label": "Care Guide",
				"href": "/pages/care"
			},
			{
				"label": "Contact",
				"href": "/contact"
			}
		]
	}
]

module.exports = {
	content:[
		"./src/**/*.{html,js,svelte,ts}",
        "./node_modules/optional-default-floaty-sveltekit-theme/**/*.{html,js,svelte,ts,css}"
	],
	theme: {
		extend: {
             colors: {
                primary: {
                    DEFAULT: "#481B4B",
                    50: "#F6F4F6",
                    100: "#EDE8ED",
                    200: "#D1C6D2",
                    300: "#B6A4B7",
                    400: "#7F5F81",
                    500: "#481B4B",
                    600: "#411844",
                    700: "#2B102D",
                    800: "#200C22",
                    900: "#160817"
                },
                secondary: {
                    DEFAULT: "#9BA657",
                    50: "#FAFBF7",
                    100: "#F5F6EE",
                    200: "#E6E9D5",
                    300: "#D7DBBC",
                    400: "#B9C189",
                    500: "#9BA657",
                    600: "#8C954E",
                    700: "#5D6434",
                    800: "#464B27",
                    900: "#2F321A"
                },
                tertiary: {
                    DEFAULT: "#A68C69",
                    50: "#FBF9F8",
                    100: "#F6F4F0",
                    200: "#E9E2DA",
                    300: "#DBD1C3",
                    400: "#C1AF96",
                    500: "#A68C69",
                    600: "#957E5F",
                    700: "#64543F",
                    800: "#4B3F2F",
                    900: "#322A20"
                },
                muted: {
                    DEFAULT: "#F0E5C9",
                    50: "#FEFEFC",
                    100: "#FEFCFA",
                    200: "#FBF9F2",
                    300: "#F9F5E9",
                    400: "#F5EDD9",
                    500: "#F0E5C9",
                    600: "#D8CEB5",
                    700: "#908979",
                    800: "#6C675A",
                    900: "#48453C"
                },
                dark: {
                    DEFAULT: "#594433",
                    50: "#F7F6F5",
                    100: "#EEECEB",
                    200: "#D6D0CC",
                    300: "#BDB4AD",
                    400: "#8B7C70",
                    500: "#594433",
                    600: "#503D2E",
                    700: "#35291F",
                    800: "#281F17",
                    900: "#1B140F"
                },
                light: {
                    DEFAULT: "#F4F4F4",
                    50: "#FEFEFE",
                    100: "#FEFEFE",
                    200: "#FCFCFC",
                    300: "#FBFBFB",
                    400: "#F7F7F7",
                    500: "#F4F4F4",
                    600: "#DCDCDC",
                    700: "#929292",
                    800: "#6E6E6E",
                    900: "#494949"
                }
            }
        },
	},
	plugins: []
}

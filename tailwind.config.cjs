/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			center: true
		},
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '80ch',
					},
				},
			},
		}
	},
	plugins: [
		({ addVariant }) => {
			addVariant('child', '& > *');
		},
		require('@tailwindcss/typography')
	]
};

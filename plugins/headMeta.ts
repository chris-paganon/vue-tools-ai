export default defineNuxtPlugin(() => {
	useHead({
		title: 'VueAI.tools',
		script: [
			{
				async: true,
				src: 'https://umami.vueai.tools/script.js',
				'data-website-id': '26f8c670-c065-4261-b86e-cbca5ed11822',
			}
		],
	});
});
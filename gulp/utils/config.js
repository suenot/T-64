module.exports = {
	bundles: [
		{
			name: 'libs',
			css: [
				'bower_components/bootstrap/dist/css/bootstrap.min.css'
			],
			js: [
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/jquery.browser/dist/jquery.browser.min.js',
				'bower_components/picturefill/dist/picturefill.min.js'
			],
			pages: [
				'public/*.html',
				'!public/i.html'
			],
			build: [
				'public/app/libs.min.js',
				'public/app/libs.min.css'
			],
			buildTo: 'public/app',
			uncss: true
		},
		{
			name: 'app',
			css: [
				'public/font/**/*.css',
				'public/app/animate.css',
				'public/app/app.css',
				'public/blocks/**/*.css'
			],
			js: [
				'public/app/**/*.js',
				'public/blocks/**/*.js'
			],
			pages: [
				'public/*.html',
				'!public/i.html'
			],
			build: [
				'public/app/app.min.js',
				'public/app/app.min.css'
			],
			buildTo: 'public/app',
			uncss: false
		}
	]
}
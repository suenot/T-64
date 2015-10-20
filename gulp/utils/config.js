module.exports = {
	bundles: [
		{
			name: 'libs',
			css: [
				// 'bower_components/bootstrap/dist/css/bootstrap.min.css',
				'bower_components/lumx/dist/lumx.css',
				'bower_components/fotorama/fotorama.css'
			],
			js: [
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/jquery.browser/dist/jquery.browser.min.js',
				'bower_components/picturefill/dist/picturefill.min.js',
				'bower_components/velocity/velocity.js',
				'bower_components/moment/min/moment-with-locales.js',
				'bower_components/angular/angular.js',
				'bower_components/lumx/dist/lumx.js',
				'bower_components/fotorama/fotorama.js'
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
			destHtml: 'public',
			uncss: true,
			async: true
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
				'public/app/modernizr.js',
				'public/app/svg.js',
				'public/app/common.js',
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
			destHtml: 'public',
			uncss: false,
			async: false
		}
	]
}
'use strict';
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Minimize image size
gulp.task('imagemin', function () {
	return gulp.src('public/img/**/*.{png,jpg,svg}')
	.pipe(imagemin({
		use: [pngquant()],
		progressive: true,
		optimizationLevel: 3,
		multipass: true,
		svgoPlugins: [
			{ removeViewBox: false }
			// { cleanupAttrs: false },
			// { removeDoctype: false },
			// { removeXMLProcInst: false },
			// { removeComments: false },
			// { removeMetadata: false },
			// { removeTitle: false },
			// { removeDesc: false },
			// { removeUselessDefs: false },
			// { removeEditorsNSData: false },
			// { removeEmptyAttrs: false },
			// { removeHiddenElems: false },
			// { removeEmptyText: false },
			// { removeEmptyContainers: false },
			// { cleanUpEnableBackground: false },
			// { convertStyleToAttrs: false },
			// { convertColors: false },
			// { convertPathData: false },
			// { convertTransform: false },
			// { removeUnknownsAndDefaults: false },
			// { removeNonInheritableGroupAttrs: false },
			// { removeUselessStrokeAndFill: false },
			// { removeUnusedNS: false },
			// { cleanupIDs: false },
			// { cleanupNumericValues: false },
			// { moveElemsAttrsToGroup: false },
			// { moveGroupAttrsToElems: false },
			// { collapseGroups: false },
			// { removeRasterImages: false },
			// { mergePaths: false },
			// { convertShapeToPath: false },
			// { sortAttrs: false },
			// { transformsWithOnePath: false },
			// { removeDimensions: false },
			// { removeAttrs: false },
			// { addClassesToSVGElemen: false }
		]
	}))
	.pipe(gulp.dest('public/img'));
});
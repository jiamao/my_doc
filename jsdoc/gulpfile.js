var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
 
gulp.task("default", function() {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(typedoc({
            exclude:["node_modules",
                    "**/*+(index|.worker|.e2e).ts"],
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es6",
            includeDeclarations: false,
 
            // Output options (see typedoc docs)
            out: "./doc",

            // default|minimal|path/to/theme
            theme: 'minimal',
 
            // TypeDoc options (see typedoc docs)
            name: "基金接口",
            ignoreCompilerErrors: false,
            version: true,
        }));
    });
    

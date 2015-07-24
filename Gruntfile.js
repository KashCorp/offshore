// npm install --save-dev grunt grunt-autoprefixer grunt-contrib-clean grunt-contrib-concat grunt-contrib-copy grunt-contrib-cssmin grunt-contrib-uglify grunt-contrib-watch grunt-inline grunt-sass grunt-usemin grunt-filerev load-grunt-tasks

module.exports = function(grunt){

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({

    // ********************************************************

    sass: {
      default: {
        options: { outputStyle: 'compressed', sourceMap: true },
        files: {'src/css/style.css': 'src/sass/style.sass'},
      }
    },

    autoprefixer: {
      options: {
        map: true, // Use and update the sourcemap
        browsers: ["last 3 versions", "> 1%", "Explorer 9"]
      },
      default: { src: 'css/style.css', dest: 'css/css/style.css' }
    },

    watch: {
      options: { livereload: true, },

      css: { files: ['src/css/style.css'] },
      js:  { files: ['js/**/*.js'] },
      html: { files: ['src/**/*.html'] },

      sass: {
        options: { livereload: false }, // don't reload for sass files; pass them on to the processors
        files: ['src/sass/**/*.sass'],
        tasks: ['sass', 'autoprefixer']
      }
    },

    // ********************************************************

    clean: {
      dist: { src: [ '.tmp', 'dist/*', '!dist/.git' ] }
    },

    filerev: {

    },

    useminPrepare: {
      html: 'src/index.html',
      options: { dest: 'dist' }
    },

    usemin: {
      options: { assetsDirs: ['dist'] },
      html: ['dist/{,*/}*.html'],
      css: ['dist/{,*/}*.css']
    },

    uglify: {
      options: {
        mangle: false, // don’t minify variable names
        // beautify: true,
        // report: true,
        // compress: { drop_console: true } // remove all window.console calls
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'src',
          dest: 'dist',
          src: [
            'index.html',
            'css/**/*',
            // 'js/modules/**/*',
            // 'js/min/**/*',
            'fonts/**/*',
            'images/**/*',
            'images/**/*',
          ]
        }]
      }
    },

    inline: {
      dist: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },




  });

  grunt.registerTask('default', ['sass', 'autoprefixer', 'watch']);

  grunt.registerTask('build', [
    'clean',
    'sass',
    'autoprefixer',
    'useminPrepare', // Looks for <!-- special blocks -->
    'concat',
    'uglify',
    'copy',
    'inline',
    'inline_angular_templates',
    'usemin',
  ])

}
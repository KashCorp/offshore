// npm install --save-dev grunt grunt-autoprefixer grunt-contrib-clean grunt-contrib-concat grunt-contrib-copy grunt-contrib-cssmin grunt-contrib-uglify grunt-contrib-watch grunt-inline grunt-sass grunt-usemin grunt-filerev load-grunt-tasks

module.exports = function(grunt){

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({

    // ********************************************************

    sass: {
      target: {
        options: { outputStyle: 'compressed', sourceMap: true },
        files: {'src/css/style.css': 'src/sass/style.sass'},
      }
    },

    autoprefixer: {
      options: {
        map: true, // Use and update the sourcemap
        browsers: ["last 3 versions", "> 1%", "Explorer 9"]
      },
      target: { src: 'src/css/style.css', dest: 'src/css/style.css' }
    },

    watch: {
      all: {
        options: { livereload: true },
        files: ['src/css/style.css', 'src/js/**/*.js', 'src/**/*.html'],
        tasks: [],
      },

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
        compress: { drop_console: true } // remove all window.console calls
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
            'fonts/**/*',
            'images/**/*',
            'offshore_panos/**/*',
            'overlay/**/*',
            'xml/**/*',
            'js/lib/krpano/**/*',
            'js/animations/**/*',
          ]
        }]
      }
    },

  });


  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass',
    'autoprefixer',
    'useminPrepare',
    'concat',
    'uglify',
    'copy',
    'usemin',
  ])

}
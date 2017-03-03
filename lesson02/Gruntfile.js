module.exports = function(grunt){
    //初始化grunt 配置
    grunt.initConfig({
 
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //concat插件的配置信息
        concat: {
            options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
            },
            cssConcat:{
                src:['src/css/css1.css','src/css/css2.css'],
                dest:'src/css/concat/<%= pkg.name %> - <%= pkg.version %>.css' //dest 是目的地输出
            },
            jsConcat:{
                src:'src/js/*.js',
                dest:'src/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
            }
        },
        //压缩css
        cssmin:{
            options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                src:'src/css/concat/<%=pkg.name %> - <%=pkg.version %>.css',//压缩是要压缩合并了的
                dest:'dist/css/<%= pkg.name %> - <%= pkg.version %>.min.css' //dest 是目的地输出
            }
        },
        //压缩js
        uglify:{
            options:{
                stripBanners:true, //合并时允许输出头部信息
                banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                src:'src/js/concat/<%=pkg.name %> - <%=pkg.version %>.js',//压缩是要压缩合并了的
                dest:'dist/js/<%= pkg.name %> - <%= pkg.version %>.min.js' //dest 是目的地输出
            }
        },
 
        jshint:{
            options:{
                jshintrc:'.jshint'
            },
            build:['Gruntfile.js','src/js/*js']
        },
 
        csslint:{
            options:{
                csslintrc:'.csslint'
            },
            build:['src/css/*.css']
 
        },
        //watch自动化
        watch:{
            build:{
                files:['src/js/*.js','src/css/*.css'],
                tasks:['jshint','csslint','concat','cssmin','uglify'],
                options:{spawn:false}
            }
        }
 
    });
    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //告诉grunt当我们在终端输入grunt时需要做些什么
    grunt.registerInitTask('default',['jshint','csslint','concat','cssmin','uglify','watch']);//先进行语法检查，如果没有问题，再合并，再压缩
};
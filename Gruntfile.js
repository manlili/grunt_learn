module.exports = function(grunt){
    //初始化grunt 配置
    grunt.initConfig({
 
        //获取package.json的信息
        pkg: grunt.file.readJSON('package.json'),
        //压缩js
        uglify:{
            build:{
                src:'jquery.js',//压缩是要压缩合并了的
                dest:'jquery.min.js' //dest 是目的地输出
            }
        }
 
    });
    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //告诉grunt当我们在终端输入grunt时需要做些什么
    grunt.registerInitTask('default',['uglify']);
};
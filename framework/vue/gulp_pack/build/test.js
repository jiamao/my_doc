(function(global, Vue, undefined){
    if(!global.__FORGE_ES6_VUE_COMPONENTS__) {
        global.__FORGE_ES6_VUE_COMPONENTS__ = {};
    }

    (function(){
        function getCurrentScriptBase() {
            var src,
                lidx,
                scripts;
            
            if (document.currentScript) {
                src = document.currentScript.src;
            } else {
                scripts = document.getElementsByTagName('script');
                src = scripts[scripts.length - 1].src;
            }
            
            lidx = src.lastIndexOf("/");
            
            return src.substring(0, lidx);
        }
        
        var styleLink = document.createElement('link');
        styleLink.rel = "stylesheet";
        styleLink.href = getCurrentScriptBase() + "/" + "test.css";
        document.head.appendChild(styleLink);
    }());
var test = Vue.extend({
        data () {
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
);
test.options.template = '\
    <div>\
        <div>this is Header</div>\
    </div>\
'

global.test = test;

global.__FORGE_ES6_VUE_COMPONENTS__['E:/github/my_doc/framework/vue/gulp_pack/components/test.vue']=test;
Vue.component('vuetest', test);


}(window, Vue));
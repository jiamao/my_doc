

export default {
    install: function(Vue, options) {
        // 1. 添加全局方法或属性
        Vue.myGlobalMethod = function () {
            // 逻辑...
            console.log(options);
        }

        // 2. 添加全局资源
        Vue.directive('my-directive', {
            bind (el, binding, vnode, oldVnode) {
                console.log(el, oldVnode);
                console.log('my-directive 2', binding, vnode);
            }
        })

        // 3. 注入组件选项
        Vue.mixin({
            created: function () {
                this.init();
            },
            methods: {
                init: function() {
                    console.log('mixin init');
                }
            }
        })

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
            console.log(methodOptions);
        }
    }
}


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
                console.log('my-directive 3', binding, vnode);
            }
        })

        // 3. 注入组件选项
        Vue.mixin({
            data() {
                return {
                    utils: {}
                }
            },
            created: function () {
                this.init();
            },
            methods: {
                init: function() {
                    console.log('mixin init');
                    const requireComponent = require.context(
                        // 其组件目录的相对路径
                        '../../utils',
                        // 是否查询其子目录
                        false,
                        // 匹配基础组件文件名的正则表达式
                        /[A-Z_]+\.(vue|js)$/
                      );
                    // 批量混入基础库
                    requireComponent.keys().forEach(fileName => {
                        // 获取组件配置
                        const mod = requireComponent(fileName)
                        
                        // 获取组件的 PascalCase 命名
                        const name = fileName
                                .split('/')
                                .pop()
                                .replace(/\.\w+$/, '');
                        this.utils[name] = mod;
                    });
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
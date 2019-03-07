引用入口文件主要是判断不同的平台引用不同的文件，这里之所有需要在二个文件中单独处理是因为nginx的语法在apache下是报错的，所以得按条件解析。
`cfg.shtml `
```
    <!--#if expr="$SERVER_SOFTWARE = /Apache/"-->
        <!--#include virtual="/mb/inc/cfg/cfg_apache.shtml?$QUERY_STRING"-->
    <!--#else-->
        <!--#include virtual="/mb/inc/cfg/cfg_nginx.shtml?$QUERY_STRING"-->
    <!--#endif-->
```

下面分别看apache和nginx的文件:：
### apache
errmsg就可以解决异常值
```
<!--#config errmsg="{}" -->
<!--#if expr="$QUERY_STRING = /(^|&)file=([a-zA-Z0-9._/]+)(&|#)?/"-->
<!--#include virtual="$2" -->
<!--#endif -->
```

### nginx
nginx需要用到stub来处理异常
```
<!--#include file="/mb/v4/mod/nginx_empty_json.shtml" -->
<!--#if expr="$QUERY_STRING = /(^|&)file=([a-zA-Z0-9._/]+)(&|#)?/"-->
<!--#include virtual="$2" stub="empty_json_file" -->
<!--#endif -->
```

这个stub文件如下：
```
<!--# block name="empty_json_file" -->{}<!--# endblock -->
```
# 引用
引用方式就是在参数中加你要引用的文件路径file

```html
<!--#include virtual="/mb/inc/cfg.shtml?file=/resources/vtools/detail_idveri_config_utf8.js" -->

```
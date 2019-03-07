## 问题描述
国庆期间，线上有用户投诉进入理财通后无法做任何操作。现像就是页面可以正常打开，显示数据都正常，就是不能点按钮和连接。

## 定位
#### 跟线上用户调试
首先找到一个线上的友好用户，跟我一步步测试。
从用户日志看，是`$.Env`为空导致的。这里说明一下：`理财通前端会在Zepto下挂一些全局对象，直接通过$.XX来使用`。
  
  但在调试中发现，这个变量不是一开始就没有的，而是在页面数据都渲染完成后某个时间变没的。
#### 重新做一个测试页
把用户出错的页面拷一个出来，每步都校验变量，发现页面显示过程中都不会出问题。`只有在用户点按钮或连接时变量不见了`
#### 跟踪$变量

由于是$变量下的改变引起的，于是我在页面初始化时，定义一了个 `window.$2=window.$`,然后在用户报错后检测`$2`的情况。如下：
```javascript
window.onerror = function (msg, url, line, col, err) {    
    if(msg && msg.indexOf('undefined') > -1) {
        if(window.$ && !window.$.Env) {
            if(window.$2 && window.$2.Env) {
                window.$ = window.$2;//这里把有效的$2还给$，这样下次用户操作就不会报错
                msg += ',$2 is ok , set $=$2';
            }
            else {
                msg += ', $2 is bad.';
            }
        }
    }
};
```
然后把这块日志上报，从日志看 `$`下的Env没有了，但`$2`下的还在。`$2`也不过是指向原$的一个引用。`因此$是被整个重新赋值的，所以不太可能是我们自已的代码造成的`。
改到这里，其实用户已经可以使用下去了，点第一次报错。用户就会再点一次成功进入下一个页面。线上投诉也基本没有了。但这样肯定不是办法，体验太差了。
#### 定义$为只读
即然`$`被整个重置，那我们就把它定义为只读，看会发生什么。
```javascript
window.$2 = $;
if(Object.defineProperty) {
	Object.defineProperty(window, '$', {
		get:function(){
			if(!this.Zepto || !this.Zepto.Env) {
				if(this.$2 && this.$2.Env) return this.$2;
			}
			return this.Zepto;
		},
		set:function(z){
			//这里做一个监控上报 略
		}
	});
}
```
同时我们也在set中上报，果然，这样处理后$无法被重置，线上用户都正常了。而且set这里的确有上报。
#### 找出被什么重置
线上虽然不再影响使用了，但还是想找出原因在哪里。
想到我们onerror上报中是有trace的，于是把上面的代码稍改一下：
```javascript
window.$2 = $;
if(Object.defineProperty) {
	Object.defineProperty(window, '$', {
		get:function(){
			if(!this.Zepto || !this.Zepto.Env) {
				if(this.$2 && this.$2.Env) return this.$2;
			}
			return this.Zepto;
		},
		set:function(z){
			throw new Error('$不能被重置');
		}
	});
}
```
看我们从日志中找到的：
```
"stack": "Error: 不能重置$变量
at set (https://qian.tenpay.com/mb/v4/index.shtml?showwxpaytitle=1&channel=wxbank&code=011SvpDO1ioSc21xECGO1fEpDO1SvpD-&state=STATE:3109:3610)
at http://cdn.staticfile.org/jquery/1.7/jquery.min.js?cclt1=ncache2:4:28777
at http://cdn.staticfile.org/jquery/1.7/jquery.min.js?cclt1=ncache2:4:28781"
```
`http://cdn.staticfile.org/jquery/1.7/jquery.min.js?cclt1=ncache`这个就是被注入到我们页面的，导致我们页面异常的原因。
#### 再找出其它请求
光注入一个jquery肯定不是目的吧，于是想看下还有没有其它js加进来。继续做一下改造。
```javascript
window.$2 = $;
if(Object.defineProperty) {
	Object.defineProperty(window, '$', {
		get:function(){
			if(!this.Zepto || !this.Zepto.Env) {
				if(this.$2 && this.$2.Env) return this.$2;
			}
			return this.Zepto;
		},
		set:function(z){
			var msg = "不能重置$变量2,";
                    var scs = $('script[src]');
                    for(var i=0;i<scs.length;i++) {
                        var s = scs[i].src;
                        if(!s || /qian(-img)?\.tenpay\.com/.test(s)) continue;//过滤掉我们自已的
                        msg += s + ',';
                    }
                    throw new Error(msg);
		}
	});
}
```
然后再看我们的日志:
```
Uncaught Error: 不能重置$变量2,
http://39.108.156.168:1616/mb.php?id=lp03,
http://cdn.staticfile.org/jquery/1.7/jquery.min.js?cclt1=ncache2,
```
嗯 ，还有个请求：http://39.108.156.168:1616/mb.php?id=lp03。
### 最后
最后定位是因为早期CDN走的是外网回源，并且用的是http。导致一台机器的某个文件被污染，现已改为https回源解决。
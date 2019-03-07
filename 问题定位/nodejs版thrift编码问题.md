在nodejs中使用thrift跟后台通信时，中文会出现乱码。
但默认又没有编码设定选项，需要手动去修改thrift原码。

读取编码指定在protocol.js的264行：
原：
```javascript
TBinaryProtocol.prototype.readString = function() {  
  var r = this.readBinary().toString('binary');  
  // console.log("readString: " + r);  
  return r;  
}  
```
改为:
```javascript
TBinaryProtocol.prototype.readString = function() {  
  var r = this.readBinary().toString('utf8');  
  // console.log("readString: " + r);  
  return r;  
}  
```
即可。

同理写编码在transport.js的105行
```javascript
write: function(buf, encoding) {  
  if (typeof(buf) === "string") {  
    // Defaulting to ascii encoding here since that's more like the original  
    // code, but I feel like 'utf8' would be a better choice.  
    buf = new Buffer(buf, encoding || 'ascii');  
  }  
  this.outBuffers.push(buf);  
  this.outCount += buf.length;  
},  
```
把默认编码改为utf8即可。
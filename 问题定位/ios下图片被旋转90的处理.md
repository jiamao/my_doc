## 问题
我们在用canvas压缩本地图片再上传后，发现ios下有些图片被旋转了90度。
## 分析
图片压缩前是正常的，假如我们不压缩直接上传也是OK的。那么问题出在压缩上。查找资料后，问题出在canvas压缩上，由于canvas绘制后，图片的旋转方位信息没有被保留，所以无法识别图片是旋转过的。
## 解决
解决办法就是，在压缩前获取图片的旋转方位。压缩时我们把图片回正。
获取图片方位我们就需要用到前端库 `exif`[https://github.com/exif-js/exif-js](https://github.com/exif-js/exif-js)
代码：
```javascript
 //获取照片方向角属性，用户旋转控制
window.EXIF.getData(file, function() {
    window.EXIF.getAllTags(this);
    var orientation = window.EXIF.getTag(this, 'Orientation')||1;
    callback && callback(orientation, file);
});
```
其中获取到的`orientation`说明

| 旋转角度|参数
| :- | :- |
| 0°|1|
|顺时针90°|	6
|逆时针90°|	8
|180°|	3|

orientation值示意图：
> ![orientation](https://github.com/jiamao/my_doc/blob/master/imgs/ori.gif?raw=true)

#### 修改压缩代码
我们只需要对 1,3,6,8进行回正即可。
```javascript
/**
 * 用canvas把图片压缩
 * img 图片img标签
 * maxw 压缩后的宽
 * maxh 压缩后的高
 * quality 压缩质量0-100
 * fixRatio 是否保持压缩比 default=false 
 * orientation 压缩前的方向，default=1
 * format 格式  image/png image/jpeg   default=image/png
 * @returns {string} 压缩后图片的base64
 * */
function compressImg(img, maxw, maxh, quality, fixRatio, orientation, format) {
    try{
        var canvas = document.createElement('canvas');                

        var w = img.width||img.naturalWidth;
        var h = img.height||img.naturalHeight;
        maxw = maxw || w;
        maxh = maxh || h;
        //先把长宽按给的宽高压缩，计算比例
        var xp = maxw / w;
        var yp = maxh / h;

        var desw = w;
        var desh = h;

        //强制压缩，如果没指定保持压缩比，则会把图片压成指定的大小
        if(!fixRatio) {
            desw = maxw;
            desh = maxh;
        }
        //为了保持比例，取缩放最大的率即可
        //只有宽高都超出采压缩长宽
        else if(xp < 1 || yp < 1) {
            //如果宽度缩小率更小，则采用宽，否则采用高
            if(xp < yp) {
                desw = maxw;
                desh = desh * xp;
            }
            else {
                desw = yp * desw;
                desh = maxh;
            }
        }

        var ox = 0;
        var oy = 0;
        var dx = 0;
        var dy = 0;
        var ctx = canvas.getContext('2d');
        //对被旋转的图片回正
        orientation = Number(orientation)||1;
        switch(orientation) {
            //需要顺时针（向左）90度旋转
            case 6: {
                canvas.width = desh;
                canvas.height = desw;
                ctx.rotate(Math.PI / 2);
                dy = -desh;
                break;
            }
            //需要逆时针（向右）90度旋转
            case 8: {
                canvas.width = desh;
                canvas.height = desw;
                ctx.rotate(-Math.PI / 2);
                dx = -desw;
                break;
            }
            //需要180度旋转
            case 3: {
                canvas.width = desw;
                canvas.height = desh;
                ctx.rotate(Math.PI);
                dx = -w;
                dy = -h;
                break;
            }
            case 1:
            default: {
                canvas.width = desw;
                canvas.height = desh;
            }
        }

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, ox, oy, w, h, dx, dy, desw, desh);

        return canvas.toDataURL(format||'image/png', quality / 100);
    }
    catch(e) {
        return '';
    }
}
```
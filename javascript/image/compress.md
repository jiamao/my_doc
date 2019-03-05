# 前端图片压缩

利用canvas对图片进行压缩操作

### 苹果手机下图片旋转问题解决
由于苹果手机的拍照会有旋转，当使用canvas压缩后，其旋转信息会丢失。
这里利用的是`exif` [https://github.com/exif-js/exif-js](https://github.com/exif-js/exif-js) 开源库来获取原图片的旋转方向，压缩后再把它转回来。 
```javascript
 //获取照片方向角属性，用户旋转控制
window.EXIF.getData(file, function() {
    window.EXIF.getAllTags(this);
    var orientation = window.EXIF.getTag(this, 'Orientation')||1;
    callback && callback(orientation, file);
});

```

orientation值示意图：
> ![orientation](https://github.com/jiamao/my_doc/blob/master/javascript/image/ori.gif?raw=true)
### 压缩
```javascript
/**
 * 用canvas把图片压缩
 * maxw 压缩后的宽
 * maxh 压缩后的高
 * quality 压缩质量0-100
 * fixRatio 是否保持压缩比 default=false 
 * orientation 压缩前的方向，default=1
 * format 格式  image/png image/jpeg   default=image/png
 * @returns {string} 压缩后图片的base64
 * */
function compressImg(maxw, maxh, quality, fixRatio, orientation, format) {
    try{
        var canvas = document.createElement('canvas');                

        var w = this.width||this.naturalWidth;
        var h = this.height||this.naturalHeight;
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
                ctx.rotate(90 * Math.PI / 180);
                dy = -desh;
                break;
            }
            //需要逆时针（向右）90度旋转
            case 8: {
                canvas.width = desh;
                canvas.height = desw;
                ctx.rotate(-90 * Math.PI / 180);
                dx = -desw;
                break;
            }
            //需要180度旋转
            case 3: {
                canvas.width = desw;
                canvas.height = desh;
                ctx.rotate(180 * Math.PI / 180);
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

        ctx.drawImage(this, ox, oy, w, h, dx, dy, desw, desh);

        return canvas.toDataURL(format||'image/png', quality / 100);
    }
    catch(e) {
        return '';
    }
}
```
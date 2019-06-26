# drawimage
在小程序中渲染分享图片

## 注意
canvas在展示的时候就会绘图，所以有异步或者缓存图片操作请加上wx:if，当数据拼好后再展示此组件，绘图完成后会调用toTempFile方法。
图像默认转成png格式，如需要jpg格式，可以加上fileType参数(微信只支持jpg或者png)


### useage

> npm i -S miniprogram-drawimage

> 详情 > 使用npm模块

> 工具 > 构建npm

```html
<drawimage bind:toTempFile="{{toTempFile}}" id="drawimage" height="400" background="{{background}}" layers="{{layers}}" fileType="{{fileType}}"/>
```

### event
```
bind:toTempFile ====> wx.canvasToTempFilePath

res.detail
```

### options

```js
width: {
    type: Number,
    value: 750
},
height: {
    type: Number,
    value: 500
},
layers: {
    type: Array,
    value: [
        {
            textAlign = 'left',
            fontSize = 32,
            text = '',
            x = 0,
            y = 0,
            color = '#000',
            lineHeight = 44,
            maxWidth = width,
            border = '0',   // '1 red'
            radius = 0,     
            padding = 0,    // '6, 12, 6, 12 or 3'
            bgColor = null,
        },
        {
            type: 'color',  // 颜色
            start,          // Array [x0, y0, x1, y1]
            end,            // Array [x, y, width, height]
            colorStop,      // Array [ [stop, color] ]
            shape: 'Linear' // Linear || Circular
        },
        {
            type: 'image',  // 图片
            imageResource,
            dx: 0,
            dy: 0,
            dWidth: width,
            dHeight: height
        },
    ]
},
background: {
    type: Object,
    value: {
        imageResource,
        dx: 0,
        dy: 0,
        dWidth: width,
        dHeight: height,
        color: {
            start,          // Array [x0, y0, x1, y1]
            end,            // Array [x, y, width, height]
            colorStop,      // Array [stop, color]
            shape: 'Linear' // Linear || Circular
        }
    }
}
```
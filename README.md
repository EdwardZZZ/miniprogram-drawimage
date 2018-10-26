# drawimage
在小程序中渲染分享图片

### useage

### options

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
                type: 'text',
                textBaseline: 'top',
                textAlign: 'left',
                fontSize: 16,
                text: '',
                x: 0,
                y: 0,
                color: '#000',
                lineHeight: 50,
                maxWidth: width,
            },
            {
                type: 'color',
                start,
                end,
                colorStop,
                shape: 'Linear'
            },
            {
                type: 'image',
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
                start,
                end,
                colorStop,
                shape: 'Linear'
            }
        }
    }


let ctx = null;

const px = (n) => {
    if (typeof n === 'undefined') return void 0;
    if (n === 0) return 0;
    const {
        windowWidth
    } = wx.getSystemInfoSync();
    return n / 750 * windowWidth;
}

Component({
    properties: {
        width: {
            type: Number,
            value: 750,
        },
        height: {
            type: Number,
            value: 500,
        },
        layers: {
            type: Array,
            value: [],
        },
        background: {
            type: Object,
            value: null,
        },
    },

    data: {
        drawing: true,
    },

    pageLifetimes: {
        show() {
            ctx = wx.createCanvasContext('draw-canvas', this);

            const {
                background,
                layers,
                width,
                height
            } = this.data;

            // 背景图片
            if (background) {
                const {
                    imageResource,
                    dx = 0,
                    dy = 0,
                    dWidth = width,
                    dHeight = height,
                    color
                } = background;
                // 背景颜色
                if (color) {
                    const {
                        start,
                        end,
                        colorStop,
                        shape = 'Linear'
                    } = color;

                    /**
                        shape Circular/Linear
                        start Array [x, y, width, height]
                        colorStop Array [stop, color]
                        end Array [x, y, width, height]
                     */
                    const grd = ctx[`create${shape}Gradient`](...start)
                    colorStop.forEach((cs) => {
                        grd.addColorStop(...cs);
                    });
                    ctx.setFillStyle(grd)
                    ctx.fillRect(...end)
                }
                ctx.drawImage(imageResource, px(dx), px(dy), px(dWidth), px(dHeight));
            }

            // 图层
            layers.forEach(layer => {
                if (layer.type === 'text') {
                    const {
                        textBaseline = 'top',
                        textAlign = 'left',
                        fontSize = 16,
                        text = '',
                        x = 0,
                        y = 0,
                        color = '#000',
                        lineHeight = 50,
                        maxWidth = width,
                    } = layer;

                    ctx.setTextBaseline(textBaseline);
                    ctx.setTextAlign(textAlign);
                    ctx.setFontSize(fontSize);
                    ctx.setFillStyle(color);
                    const mw = px(maxWidth);

                    const textArr = [];
                    let tempArr = [];
                    let tempWidth = 0;
                    text.split('').forEach(word => {
                        const w = ctx.measureText(word).width;

                        if (tempWidth + w > mw) {
                            textArr.push(tempArr.join(''));
                            tempArr = [word];
                            tempWidth = 0;
                        } else {
                            tempArr.push(word);
                            tempWidth += w;
                        }
                    });
                    if (tempArr.length > 0) {
                        textArr.push(tempArr.join(''));
                    }

                    textArr.forEach((str, i) => {
                        ctx.fillText(str, px(x), px(y + i * lineHeight), mw);
                    });
                }

                if (layer.type === 'color') {
                    const {
                        start,
                        end,
                        colorStop,
                        shape = 'Linear'
                    } = layer;

                    const grd = ctx[`create${shape}Gradient`](...start)
                    colorStop.forEach((cs) => {
                        grd.addColorStop(...cs);
                    });
                    ctx.setFillStyle(grd)
                    ctx.fillRect(...end)
                }

                if (layer.type === 'image') {
                    const {
                        imageResource,
                        dx = 0,
                        dy = 0,
                        dWidth = width,
                        dHeight = height
                    } = layer;
                    ctx.drawImage(imageResource, px(dx), px(dy), px(dWidth), px(dHeight));
                }
            });

            ctx.draw(false, () => {
                this.setData({
                    drawing: false,
                });
            });
        },
    },

    methods: {
        toTempFilePath({
            destWidth,
            destHeight
        } = {}) {
            return new Promise((resolve) => {
                const {
                    width,
                    height
                } = this.data;

                wx.canvasToTempFilePath({
                    destWidth: destWidth || width,
                    destHeight: destHeight || height,
                    canvasId: 'draw-canvas',
                    success(res) {
                        resolve(res.tempFilePath)
                    }
                }, this);
            });
        },
    }
});

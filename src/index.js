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
                        text,
                        x = 0,
                        y = 0,
                        maxWidth,
                    } = layer;

                    ctx.setTextBaseline(textBaseline);
                    ctx.setTextAlign(textAlign);
                    ctx.setFontSize(fontSize);
                    ctx.fillText(text, px(x), px(y), px(maxWidth));
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

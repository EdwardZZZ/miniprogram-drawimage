
Page({
    data: {
        background: {
            imageResource: '/pages/assets/marker.png',
        },
        layers: [
            { type: 'text', text: 'hah1', y: 0 },
            { type: 'text', text: 'hah1', y: 50 },
            { type: 'text', text: 'hah1', y: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 0, dy: 0, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 50, dy: 0, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 100, dy: 0, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 150, dy: 0, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 0, dy: 0, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 0, dy: 50, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 0, dy: 100, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/pages/assets/marker.png', dx: 0, dy: 150, dWidth: 100, dHeight: 100 },
            { type: 'text', text: 'hah1', y: 150 },
            { type: 'text', text: 'hah1', y: 200 },
        ],
    },
    onLoad() {
        console.log(wx.getSystemInfoSync());
    },

    download() {
        this.selectComponent('#drawimage').toTempFilePath().then((path) => {
            console.log(path);
            wx.previewImage({
                current: path, // 当前显示图片的http链接
                urls: [path] // 需要预览的图片http链接列表
            })
        });
    },
});
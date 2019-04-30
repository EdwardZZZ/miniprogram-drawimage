
Page({
    data: {
        background: {
            imageResource: '/images/1.jpg',
        },
        layers: [
            { type: 'text', text: '联发科健康拉', y: 100, radius: 20, bgColor: 'orange' },
            { type: 'text', textAlign: 'right', text: '联发科健康拉', y: 100, x: 750, radius: 20, border: '6 red', lineHeight: 42, padding: '6 10 6 10' },
            { type: 'text', textAlign: 'center', text: '联发科', y: 305, x: 375, radius: 10, border: '6 red', lineHeight: 42, padding: '6 10 6 10' },
            { type: 'text', textAlign: 'center', text: '联发科健康拉', y: 100, x: 375, radius: 20, border: '6 red', lineHeight: 42, padding: '6 10 6 10' },
            // { type: 'text', text: 'hahbbbb2', y: 50 },
            // { type: 'text', text: 'hahccccccccccccc3', y: 100, },
            // { type: 'image', imageResource: '/images/1.jpg', dx: 200, dy: 100, dWidth: 100, dHeight: 100 },
            { type: 'image', imageResource: '/images/1.jpg', dx: 100, dy: 200, dWidth: 100, dHeight: 100, radius: 100, },
            // { type: 'text', text: 'hahdddddddddddddd4', y: 150 },
            {
                type: 'text', 
                text: '联发科健康拉abadasfsdaf联发科健康拉联发科健康拉联发科健康拉联发科健康拉联发科健康拉联发科健康拉', 
                x: 100,
                y: 500,
                maxWidth: 200,
                padding: '5, 20, 5, 20',
                radius: 50,
                bgColor: '#ddd',
                border: '6 red'
            },
        ],
        images: [],
    },

    onLoad() {
        // console.log(wx.getSystemInfoSync());
    },

    toTempFile({ target, detail }) {
        console.log(target.dataset.index, detail.tempFilePath);
        this.data.images[target.dataset.index] = detail.tempFilePath;
    },

    tapimage(e) {
        wx.showToast({
            title: '长按分享好友',
            icon: 'none',
            duration: 20000
        })

        setTimeout(() => {
            console.log(e);
            const { images } = this.data;
            wx.previewImage({
                current: images[0],
                urls: images,
            });
        }, 1000);
    },

    tapbody(e) {
        console.log(e);
    }
});
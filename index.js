const express = require('express');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const images = [
    'https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/123-dead.png',
    'https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/124-dead.png',
    'https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/125-dead.png',
    'https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/126-dead.png',
];

app.get('/', async (req, res) => {
    const canvas = createCanvas(images.length * 384, 384);
    const context = canvas.getContext('2d');
    for (const url of images) {
        const image = await loadImage(url);
        context.drawImage(image, images.indexOf(url)*384, 0);
        if (url === images[images.length - 1]) {
            const dataUrl = canvas.toDataURL('image/png');
            res.send(`
      <html>
        <head>
          <title>Example</title>
        </head>
        <body>
          <img src="${dataUrl}" alt="Image">
        </body>
      </html>
    `);
        }
    }


});

app.listen(8080, () => {
    console.log('Server started on port 8080');
});

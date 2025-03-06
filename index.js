const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const extractHtml = require('./extract_html');

const server = express();
server.use(morgan('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const upload = multer({ dest: './tmp/uploads' });

server.get('/', (_, res) => {
    res.status(200).send({
        status: 'success',
        message: 'Welcome to Zoho Task API',
    });
});

server.post('/htmlextract', upload.single('file'), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).send({
                status: 'failed',
                error: 'No File Uploaded ...',
            });
        const extractedText = await extractHtml(req.file.path);
        res.status(200).send({
            status: 'success',
            text: extractedText,
        });
    } catch (error) {
        return res.status(400).send({
            status: 'failed',
            error: error.message,
        });
    }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server Listening on localhost:${port} 🔥`);
});

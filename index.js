const express = require('express');
const morgan = require('morgan');
const extractHtmlText = require('./extract_html');

const server = express();
server.use(morgan('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(express.text());

server.get('/', (_, res) => {
    res.status(200).send({
        status: 'success',
        message: 'Welcome to Zoho Task API',
    });
});

server.post('/htmlextract', async (req, res) => {
    try {
        if (!req.body)
            return res.status(400).send({
                status: 'failed',
                error: 'No Data Received',
            });
        const extractedText = await extractHtmlText(req.body);
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

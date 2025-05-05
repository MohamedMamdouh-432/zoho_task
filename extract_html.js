const { JSDOM } = require('jsdom');

function extractText(node) {
    let text = '';
    node.childNodes.forEach((child) => {
        if (child.nodeType === 3) {
            text += child.textContent.trim() + ' ';
        } else if (
            child.nodeType === 1 &&
            !['STYLE', 'SCRIPT', 'NOSCRIPT', 'LINK', 'META'].includes(child.nodeName)
        ) {
            text += extractText(child);
            // if (child.nodeName === 'P') {
            //     text += '\n';
            // }
        }
    });
    return text;
}

module.exports = async (htmlCode) => {
    try {
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;

        const extractedText = extractText(document.body)
            // .replace(/\n{3,}/g, '\n') 
            .replace(/[ \t]+/g, ' ')   
            .trim();

        return extractedText;
    } catch (err) {
        console.error('Error processing HTML:', err);
        throw err;
    }
};

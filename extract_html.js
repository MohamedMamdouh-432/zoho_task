const { JSDOM } = require('jsdom');

function extractText(node) {
    let text = '';
    node.childNodes.forEach((child) => {
        if (child.nodeType === 3) {
            text += child.textContent.trim() + ' ';
        } else if (
            child.nodeType === 1 &&
            !['STYLE', 'SCRIPT', 'NOSCRIPT', 'LINK', 'META'].includes(
                child.nodeName
            )
        ) {
            if (child.nodeName === 'BR') {
                text += '\n';
            }
            text += extractText(child);
            if (child.nodeName === 'P') {
                text += '\n\n';
            }
        }
    });
    return text;
}

module.exports = async (htmlCode) => {
    try {
        const dom = new JSDOM(htmlCode);
        const document = dom.window.document;

        const extractedText = extractText(document.body)
            .replace(/\s+/g, ' ')
            .replace(/\n\s+/g, '\n')
            .trim();

        return extractedText;
    } catch (err) {
        console.error('Error processing HTML:', err);
        throw err;
    }
};

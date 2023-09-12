const pdf2json = require('pdf2json');

const parser = new pdf2json();
parser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
parser.on("pdfParser_dataReady", pdfData => {
        console.log(pdfData);
    });

    parser.loadPDF("test.pdf");
import React from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import terms from '../../../../assets/files/cgu.pdf'
import {makeStyles} from "@material-ui/core/styles";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MAX_WIDTH = 960;

const useStyles = makeStyles({
    page: {
        marginLeft: window.innerWidth < MAX_WIDTH ? '-12.5%' : 'initial'
    }
});

const UseTerms = ({ ...props }) => {
    const classes = useStyles();
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    };

    return (
        <Document file={terms} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={window.innerWidth < MAX_WIDTH ? window.innerWidth : null} scale={1.25} className={classes.page} />
        </Document>
    )
};

export default UseTerms

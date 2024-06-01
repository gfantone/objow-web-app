import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  AppBar,
  HeaderContainer,
  HeaderTitle,
  Pagination,
  Toolbar,
} from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../IconButton';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MAX_WIDTH = 960;

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito Sans',
  },
  palette: {
    background: {
      default: 'grey',
    },
  },
});

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
  },
  componentContainer: {
    width: 'fit-content',
    overflow: 'auto',
  },
  page: {
    marginLeft: window.innerWidth < MAX_WIDTH ? '-12.5%' : 'initial',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const FileLayout = ({ component: Component, history, ...rest }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const goBack = () => {
    history.goBack();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const onPageChange = (event, page) => {
    setPageNumber(page);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Route
        {...rest}
        render={(matchProps) => (
          <div>
            <CssBaseline />
            <ElevationScroll {...rest}>
              <AppBar>
                <Toolbar>
                  <HeaderContainer>
                    <IconButton size="small" onClick={goBack}>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </IconButton>
                    <HeaderTitle noWrap variant="h6" align="center">
                      {title}
                    </HeaderTitle>
                  </HeaderContainer>
                </Toolbar>
              </AppBar>
            </ElevationScroll>
            <Toolbar />
            <main className={classes.main}>
              <div className={classes.componentContainer}>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page
                    pageNumber={pageNumber}
                    width={
                      window.innerWidth < MAX_WIDTH ? window.innerWidth : null
                    }
                    scale={1.25}
                    className={classes.page}
                  />
                </Document>
                <Component
                  onTitle={setTitle}
                  onFile={setFile}
                  {...matchProps}
                />
              </div>
            </main>
            <Toolbar />
            <AppBar position="fixed" color="primary" className={classes.appBar}>
              <Toolbar>
                <HeaderContainer className={classes.paginationContainer}>
                  <Pagination
                    page={pageNumber}
                    count={numPages}
                    siblingCount={0}
                    onChange={onPageChange}
                  />
                </HeaderContainer>
              </Toolbar>
            </AppBar>
          </div>
        )}
      />
    </MuiThemeProvider>
  );
};

export default withRouter(FileLayout);
